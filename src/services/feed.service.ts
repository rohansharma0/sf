import { FeedSection } from "../models/feedSection.model";
import { getCollectionProducts } from "./collection.service";
import { SortType } from "./product.service";

export async function createFeedSection(data: any) {
    return await FeedSection.create(data);
}

export async function getFeedSections() {
    return await FeedSection.find().sort({ position: 1 }).lean();
}

export async function getHomepageFeed() {
    const sections = await FeedSection.find({ isActive: true })
        .sort({ position: 1 })
        .lean();

    const result: any[] = [];

    for (const s of sections) {
        const productsResp = await getCollectionProducts(
            s.collectionId.toString(),
            {},
            {
                page: 1,
                limit: s.limit || 20,
                sort: "newest" as SortType,
                includeFacets: false,
            }
        );

        result.push({
            title: s.title,
            slug: s.slug,
            layout: s.layout,
            position: s.position,
            products: productsResp.items,
        });
    }

    return result;
}

export async function updateFeedSection(id: string, data: any) {
    return await FeedSection.findByIdAndUpdate(id, data, { new: true }).lean();
}

export async function deleteFeedSection(id: string) {
    return await FeedSection.findByIdAndDelete(id).lean();
}
