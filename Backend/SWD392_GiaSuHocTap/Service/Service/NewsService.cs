using Common.DTO.Feedback;
using DAO.Model;
using Repository.IRepository;
using Repository.Repository;
using Service.IService;
using Common.DTO.News;
using AutoMapper;
using Common.DTO;
using Common.DTO.Query;
using Microsoft.AspNetCore.Http;
using Common.Constant.Firebase;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;

namespace Service.Service
{
    public class NewsService : INewsService
    {
        private readonly INewsRepository _newsRepository;
        private readonly IMapper _mapper;
        private readonly StorageClient _storageClient;

        public NewsService(INewsRepository newsRepository, IMapper mapper)
        {
            _newsRepository = newsRepository;
            _mapper = mapper;

            string pathToJsonFile = "firebase.json";

            try
            {
                // Create GoogleCredential from the JSON file
                GoogleCredential credential = GoogleCredential.FromFile(pathToJsonFile)
                    .CreateScoped(FirebaseLink.LinkFirebase);

                // Create StorageClient with the provided credential
                _storageClient = StorageClient.Create(credential);
            }
            catch (Exception ex)
            {
                // Handle any exceptions related to credential creation
                throw new Exception(FirebaseLink.FailToCreatCer + ex.Message);
            }
        }

        public async Task<NewsDTO> AddNewNews(NewsCreateDTO news, IFormFile imageFile)
        {
            var newsMap = _mapper.Map<News>(news);
            string image = string.Empty;

            // Generate a unique name for each image file
            var imageName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
            image = imageName;
            // Upload each image to Firebase Storage
            using (var stream = imageFile.OpenReadStream())
            {
                await _storageClient.UploadObjectAsync(
                    bucket: "giasuhoctap-91d48.appspot.com",
                    objectName: imageName,
                    contentType: imageFile.ContentType,
                    source: stream);
            }

            newsMap.Status = true;
            newsMap.Image = image;
            var response = await _newsRepository.AddNewNews(newsMap);
            var mapperResponse = _mapper.Map<NewsDTO>(response);
            if (response != null)
            {
                return mapperResponse;
            }
            return null;
        }

        public IEnumerable<News> GetAllNews()
        {
            return _newsRepository.GetAllNews().AsEnumerable();
        }

        public async Task<News?> GetNewsById(int id)
        {
            return await _newsRepository.GetNewsById(id);
        }

        public PaginationResponseDTO<NewsDTO> GetPagedNewsList(NewsParameters parameters)
        {
            var requests = _newsRepository.GetPagedNewsList(parameters);

            var mappedResponse = _mapper.Map<PaginationResponseDTO<NewsDTO>>(requests);
            mappedResponse.Data = _mapper.Map<List<NewsDTO>>(requests.OrderByDescending(p => p.CreateDate));

            return mappedResponse;
        }

        public async Task<News> UpdateNews(News news)
        {
            return await _newsRepository.UpdateNews(news);
        }
    }
}
