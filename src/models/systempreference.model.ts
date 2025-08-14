import { Schema, Document, model } from "mongoose";

export interface ISystemPreference extends Document {
    groupId: string;
    key: string;
    value: string;
}

const SystemPreferenceSchema = new Schema<ISystemPreference>(
    {
        groupId: { type: String, required: true, index: true },
        key: { type: String, required: true },
        value: { type: String, required: true },
    },
    { timestamps: true }
);

SystemPreferenceSchema.index({ groupId: 1, key: 1 }, { unique: true });

export default model<ISystemPreference>(
    "SystemPreference",
    SystemPreferenceSchema
);
