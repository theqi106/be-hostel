import * as services from '../services/acreage'

export const getAcreage = async (req, res) =>{
    try {
        const response = await services.getAcreage()
        return res.status(200).json(response)
    } catch(err){
        return res.status(500).json({
            err : -1,
            msg: 'Fail at category controller : ' + err
        })
    }
}