var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SocialMediaPostForm from "../SocialMediaPostForm";
// Mock the useCampaigns hook
jest.mock("@/hooks/campaigns/useCampaigns", () => ({
    useCampaigns: () => ({
        campaigns: [
            { id: "1", name: "Campaign 1" },
            { id: "2", name: "Campaign 2" },
        ],
    }),
}));
// Mock the onSubmit function
const mockOnSubmit = jest.fn(() => Promise.resolve({ success: true }));
describe("SocialMediaPostForm", () => {
    it("renders the form with empty fields when no post is provided", () => {
        render(_jsx(SocialMediaPostForm, { onSubmit: mockOnSubmit, isSubmitting: false }));
        expect(screen.getByLabelText("Title")).toBeInTheDocument();
        expect(screen.getByLabelText("Content")).toBeInTheDocument();
        expect(screen.getByText("Select platform")).toBeInTheDocument();
        expect(screen.getByText("Select content type")).toBeInTheDocument();
    });
    it("renders the form with pre-filled fields when a post is provided", () => {
        const mockPost = {
            id: "1",
            title: "Test Post",
            content: "This is test content",
            platform: "Facebook",
            content_type: "text",
            scheduled_date: "2023-10-15",
            publish_time: "14:30",
            status: "draft",
            is_approved: false,
            media_urls: [],
            link_url: "",
            tags: [],
            created_at: "2023-10-01",
            updated_at: "2023-10-01",
            company_id: "company123",
        };
        render(_jsx(SocialMediaPostForm, { post: mockPost, onSubmit: mockOnSubmit, isSubmitting: false }));
        expect(screen.getByLabelText("Title")).toHaveValue("Test Post");
        expect(screen.getByLabelText("Content")).toHaveValue("This is test content");
    });
    it("calls onSubmit with the correct values when the form is submitted", () => __awaiter(void 0, void 0, void 0, function* () {
        render(_jsx(SocialMediaPostForm, { onSubmit: mockOnSubmit, isSubmitting: false }));
        fireEvent.change(screen.getByLabelText("Title"), {
            target: { value: "New Post" },
        });
        fireEvent.change(screen.getByLabelText("Content"), {
            target: { value: "New Content" },
        });
        fireEvent.change(screen.getByLabelText("Scheduled Date"), {
            target: { value: "2023-10-20" },
        });
        fireEvent.click(screen.getByText("Create Post"));
        yield waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                title: "New Post",
                content: "New Content",
                platform: "LinkedIn",
                content_type: "text",
                scheduled_date: "2023-10-20",
                publish_time: "09:00",
                media_urls: [],
                link_url: "",
                campaign_id: "",
                tags: [],
            });
        });
    }));
    it("handles form submission errors", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockOnSubmitError = jest.fn(() => Promise.resolve({ success: false, error: "Test Error" }));
        render(_jsx(SocialMediaPostForm, { onSubmit: mockOnSubmitError, isSubmitting: false }));
        fireEvent.change(screen.getByLabelText("Title"), {
            target: { value: "Error Post" },
        });
        fireEvent.click(screen.getByText("Create Post"));
        // Since we can't directly test the toast message, we'll just ensure the function was called
        yield waitFor(() => {
            expect(mockOnSubmitError).toHaveBeenCalled();
        });
    }));
    it("correctly updates a post when a post object is provided", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockPost = {
            id: "1",
            title: "Original Post",
            content: "Original Content",
            platform: "Twitter",
            content_type: "link",
            scheduled_date: "2023-11-01",
            publish_time: "08:00",
            status: "approved",
            is_approved: true,
            media_urls: [],
            link_url: "",
            tags: [],
            created_at: "2023-10-25",
            updated_at: "2023-10-25",
            company_id: "company123",
        };
        render(_jsx(SocialMediaPostForm, { post: mockPost, onSubmit: mockOnSubmit, isSubmitting: false }));
        fireEvent.change(screen.getByLabelText("Title"), {
            target: { value: "Updated Post" },
        });
        fireEvent.click(screen.getByText("Update Post"));
        yield waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledWith({
                title: "Updated Post",
                content: "Original Content",
                platform: "Twitter",
                content_type: "link",
                scheduled_date: "2023-11-01",
                publish_time: "08:00",
                media_urls: [],
                link_url: "",
                campaign_id: "",
                tags: [],
            });
        });
    }));
});
