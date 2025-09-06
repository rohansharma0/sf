import SystemPreference from "../models/systempreference.model";

export const getAll = async () => {
    return await SystemPreference.find({}).select("key value -_id");
};

export const getByKey = async (key: string) => {
    return await SystemPreference.findOne({ key }).select("key value -_id");
};

export const set = async (key: string, value: string) => {
    return await SystemPreference.findOneAndUpdate(
        { key },
        { value },
        { new: true, upsert: true }
    ).select("key value -_id");
};
