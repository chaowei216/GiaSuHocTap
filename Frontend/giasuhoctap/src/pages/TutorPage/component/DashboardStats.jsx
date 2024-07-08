function DashboardStats({ title, icon, value, description, colorIndex }) {

    const COLORS = ["primary", "primary"]

    const getDescStyle = () => {
        if (description.includes("↗︎")) return "font-bold text-green-700 dark:text-green-300"
        else if (description.includes("↙")) return "font-bold text-rose-500 dark:text-red-400"
        else return ""
    }

    return (
        <div style={{background: "#ffffff", borderRadius: "10px"}} className="stats shadow p-3 flex justify-between items-center">
            <div className="stat">
                <div className="stat-title dark:text-slate-500 text-xl">{title}</div>
                <div style={{ color: "#4a00ff" }} className={`stat-value text-3xl`}>{value}</div>
                <div className={"stat-desc  " + getDescStyle()}>{description}</div>
            </div>
            <div className={`stat-figure dark:text-slate-300 text-${COLORS[colorIndex % 2]}`}>{icon}</div>
        </div>
    )
}

export default DashboardStats