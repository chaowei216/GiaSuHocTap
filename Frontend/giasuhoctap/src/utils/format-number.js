export function fNumber(number) {
  return formatNumber(number);
}

export function fCurrency(number) {
  return formatCurrency(number);
}

export function fPercent(number) {
  return formatPercent(number);
}

export function fShortenNumber(number) {
  return formatShortenNumber(number);
}

export function fData(number) {
  return formatData(number);
}

function formatNumber(number) {
  return number ? numberWithCommas(parseFloat(number).toFixed(0)) : '';
}

function formatCurrency(number) {
  return number ? '$' + numberWithCommas(parseFloat(number).toFixed(2)) : '';
}

function formatPercent(number) {
  return number ? (parseFloat(number) * 100).toFixed(1) + '%' : '';
}

function formatShortenNumber(number) {
  if (!number) return '';

  const suffixes = ['', 'k', 'm', 'b', 't'];
  const suffixNum = Math.floor(('' + number).length / 3);
  let shortNum = parseFloat((suffixNum !== 0 ? (number / Math.pow(1000, suffixNum)) : number).toPrecision(3));
  if (shortNum % 1 !== 0) {
    shortNum = shortNum.toFixed(2);
  }
  return shortNum + suffixes[suffixNum];
}

function formatData(number) {
  return number ? numberWithCommas(parseFloat(number).toFixed(1)) + ' b' : '';
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
