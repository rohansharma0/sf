import { Schema, Document, model } from "mongoose";

export interface ISystemPreference extends Document {
    key: string;
    value: string;
    isPublic: boolean;
    groupId?: string;
    loadOnBoot?: boolean;
}

const SystemPreferenceSchema = new Schema<ISystemPreference>(
    {
        key: { type: String, required: true, unique: true },
        value: { type: String, required: true },
        isPublic: { type: Boolean, default: true },
        groupId: { type: String },
        loadOnBoot: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export default model<ISystemPreference>(
    "SystemPreference",
    SystemPreferenceSchema
);
