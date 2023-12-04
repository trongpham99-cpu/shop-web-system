const permissions = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                code: '403',
                message: 'Permission denied'
            })
        }

        const validPermission = req.objKey.permissions.includes(permission)
        if (!validPermission) {
            return res.status(403).json({
                code: '403',
                message: 'Permission denied'
            })
        }

        next()
    }
}

module.exports = {
    permissions,
}