import { FilterQuery } from "mongoose";
import SystemPreference, {
    ISystemPreference,
} from "../models/systempreference.model";

export const getAll = async (): Promise<ISystemPreference[]> => {
    const query: FilterQuery<ISystemPreference> = {
        loadOnBoot: true,
        isPublic: true,
    };

    return await SystemPreference.find(query)
        .select("-_id key value groupId")
        .lean();
};

export const getByKey = async (
    key: string,
    onlyPublic = false
): Promise<ISystemPreference | null> => {
    const query: FilterQuery<ISystemPreference> = { key };
    if (onlyPublic) query.isPublic = true;
    return await SystemPreference.findOne(query).select("-_id value").lean();
};
export const set = async (
    input: Partial<ISystemPreference>
): Promise<ISystemPreference> => {
    return await SystemPreference.findOneAndUpdate({ key: input.key }, input, {
        new: true,
        upsert: true,
    })
        .select("-_id key value isPublic groupId loadOnBoot")
        .lean();
};

export const getByGroup = async (
    groupId: string,
    onlyPublic = false
): Promise<ISystemPreference[]> => {
    const query: FilterQuery<ISystemPreference> = { groupId };
    if (onlyPublic) query.isPublic = true;
    return await SystemPreference.find(query).select("-_id key value").lean();
};

export const deleteByKey = async (
    key: string
): Promise<ISystemPreference | null> => {
    return await SystemPreference.findOneAndDelete({ key })
        .select("-_id key value")
        .lean();
};

export const deleteByGroup = async (
    groupId: string
): Promise<{ deletedCount: number }> => {
    const result = await SystemPreference.deleteMany({ groupId });
    return { deletedCount: result.deletedCount || 0 };
};
