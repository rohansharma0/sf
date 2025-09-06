import { Schema, Document, model } from "mongoose";

export interface ISystemPreference extends Document {
    key: string;
    value: string;
}

const SystemPreferenceSchema = new Schema<ISystemPreference>(
    {
        key: { type: String, required: true },
        value: { type: String, required: true },
    },
    { timestamps: true }
);

SystemPreferenceSchema.index({ key: 1 }, { unique: true });

export default model<ISystemPreference>(
    "SystemPreference",
    SystemPreferenceSchema
);
