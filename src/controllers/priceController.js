import * as services from '../services/price'

export const getPrice = async (req, res) =>{
    try {
        const response = await services.getPrice()
        return res.status(200).json(response)
    } catch(err){
        return res.status(500).json({
            err : -1,
            msg: 'Fail at category controller : ' + err
        })
    }
}