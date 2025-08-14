import SystemPreference from "../models/systempreference.model";

export const getAll = async () => {
    return await SystemPreference.find({}).select("key groupId value -_id");
};

export const getByKey = async (groupId: string, key: string) => {
    return await SystemPreference.findOne({ groupId, key }).select(
        "key groupId value -_id"
    );
};

export const getByGroupId = async (groupId: string) => {
    return await SystemPreference.find({ groupId }).select(
        "key groupId value -_id"
    );
};

export const set = async (groupId: string, key: string, value: string) => {
    return await SystemPreference.findOneAndUpdate(
        { groupId, key },
        { value },
        { new: true, upsert: true }
    ).select("key groupId value -_id");
};
