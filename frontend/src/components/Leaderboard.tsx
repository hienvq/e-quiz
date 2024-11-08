const Leaderboard = ({ leaderboard }) => {
    return (
        <>
            <h1>Leaderboard</h1>
            {leaderboard.map((e, index) => (
                <p
                    key={e.userCode}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <span>
                        {index + 1}. {e.userCode}
                    </span>
                    <span>{e.point}</span>
                </p>
            ))}
        </>
    );
};

export default Leaderboard;
