module.exports = app => {
    const ok = (req, res) => {
        res.json({sucess: true})
    }
    return {ok}
}