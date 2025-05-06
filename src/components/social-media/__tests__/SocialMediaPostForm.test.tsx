import React from "react";
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
    render(
      <SocialMediaPostForm onSubmit={mockOnSubmit} isSubmitting={false} />,
    );
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
    render(
      <SocialMediaPostForm
        post={mockPost}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
      />,
    );
    expect(screen.getByLabelText("Title")).toHaveValue("Test Post");
    expect(screen.getByLabelText("Content")).toHaveValue(
      "This is test content",
    );
  });
  it("calls onSubmit with the correct values when the form is submitted", async () => {
    render(
      <SocialMediaPostForm onSubmit={mockOnSubmit} isSubmitting={false} />,
    );
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
    await waitFor(() => {
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
  });
  it("handles form submission errors", async () => {
    const mockOnSubmitError = jest.fn(() =>
      Promise.resolve({ success: false, error: "Test Error" }),
    );
    render(
      <SocialMediaPostForm onSubmit={mockOnSubmitError} isSubmitting={false} />,
    );
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Error Post" },
    });
    fireEvent.click(screen.getByText("Create Post"));
    // Since we can't directly test the toast message, we'll just ensure the function was called
    await waitFor(() => {
      expect(mockOnSubmitError).toHaveBeenCalled();
    });
  });
  it("correctly updates a post when a post object is provided", async () => {
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
    render(
      <SocialMediaPostForm
        post={mockPost}
        onSubmit={mockOnSubmit}
        isSubmitting={false}
      />,
    );
    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Updated Post" },
    });
    fireEvent.click(screen.getByText("Update Post"));
    await waitFor(() => {
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
  });
});
