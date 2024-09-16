export interface ContentType {
    created_at: string;
    description: string | null;
    duration: number;
    expiry_date: string | null;
    filename: string;
    id: string;
    name: string;
    path: string;
    size: number;
    start_date: string | null;
    type: string;
    updated_at: string;
}

export interface ContentScreenType {
    content: ContentType,
    content_website: WebsiteType,
    content_id: string;
    duration: number;
    screen_id: string;
    type_content: string;
}

export interface WebsiteType {
    id: string;
    title: string;
    url?: string;
    html?: string | null;
    created_at: Date;
    updated_at: Date;
}