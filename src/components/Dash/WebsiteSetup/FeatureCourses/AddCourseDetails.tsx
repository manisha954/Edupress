"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import useCourseDetailsMutations from "./CourseDetailsMutation";
import { imageUrlToFile } from "@/components/UI/Conversion/URLToFile";
import { useRouter } from "next/navigation";
import PhotoInput from "@/components/UI/InputField/PhotoInput";
import SuccessNotification from "@/components/UI/Notification/SuccessNotification";
import FailedNotification from "@/components/UI/Notification/FailedNotification";

interface CourseFormData {
  courseId: string;
  courseTitle: string;
  instructor: string;
  courseDuration: string;
  courseStudents: string;
  coursePrice: number;
  courseLevel: string;
  reviews: string;
  courseCategory: string;
  originalPrice: number;
}

const AddFeatureCourseForm: React.FC<any> = ({
  initialData,
  onClose,
}: {
  initialData: any;
  onClose: () => void;
}) => {
  const { courseDetail } = useCourseDetailsMutations();
  const router = useRouter();

  const [formData, setFormData] = useState<CourseFormData>({
    courseId: "",
    courseTitle: "",
    instructor: "",
    courseDuration: "",
    courseStudents: "",
    coursePrice: 0,
    courseLevel: "beginner",
    reviews: "",
    courseCategory: "",
    originalPrice: 0,
  });

  const [courseImage, setCourseImage] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        courseId: initialData.courseId || "",
        courseTitle: initialData.courseTitle || "",
        instructor: initialData.instructor || "",
        courseDuration: initialData.courseDuration || "",
        courseStudents: initialData.courseStudents || "",
        coursePrice: initialData.coursePrice || 0,
        courseLevel: initialData.courseLevel || "beginner",
        reviews: initialData.reviews || "",
        courseCategory: initialData.courseCategory || "",
        originalPrice: initialData.originalPrice || 0,
      });

      if (initialData.courseImage) {
        imageUrlToFile(initialData.courseImage).then((file) => {
          setCourseImage(file);
        });
      }
    } else {
      resetFormState();
    }
  }, [initialData]);

  const resetFormState = () => {
    setFormData({
      courseId: "",
      courseTitle: "",
      instructor: "",
      courseDuration: "",
      courseStudents: "",
      coursePrice: 0,
      courseLevel: "beginner",
      reviews: "",
      courseCategory: "",
      originalPrice: 0,
    });
    setCourseImage(null);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setCourseImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      if (!formData.courseTitle || !formData.instructor) {
        setErrorMessage("Course title and instructor are required.");
        setIsLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("courseDetailsData", JSON.stringify(formData));
      if (courseImage) {
        formDataToSend.append("courseImage", courseImage);
      }

      const response = await courseDetail(formDataToSend);

      if (response?.success) {
        setSuccessMessage(response.success);
        resetFormState();
      } else if (response?.error) {
        setErrorMessage(response.error);
        if (response.error === "Invalid session") {
          router.push("/login");
        }
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      setErrorMessage("An error occurred while submitting the data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Add Featured Course
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              id="courseTitle"
              placeholder="Course Title"
              value={formData.courseTitle}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              id="instructor"
              placeholder="Instructor Name"
              value={formData.instructor}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              id="courseDuration"
              placeholder="Course Duration"
              value={formData.courseDuration}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              id="courseStudents"
              placeholder="Number of Students"
              value={formData.courseStudents}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              id="coursePrice"
              placeholder="Course Price"
              type="number"
              value={formData.coursePrice}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <input
              id="originalPrice"
              placeholder="Original Price"
              type="number"
              value={formData.originalPrice}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <textarea
            id="reviews"
            placeholder="Reviews"
            value={formData.reviews}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <input
            id="courseCategory"
            placeholder="Course Category"
            value={formData.courseCategory}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <PhotoInput
            values={courseImage}
            onFileSelected={handleFileChange}
            allowedExtensions={["jpg", "jpeg", "png"]}
          />

          <div className="space-y-2">
            <label className="block text-gray-600 font-medium">
              Course Level
            </label>
            <select
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  courseLevel: e.target.value,
                }))
              }
              value={formData.courseLevel}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-200 disabled:bg-gray-400"
          >
            {isLoading ? "Submitting..." : "Submit"}
          </button>
        </form>

        {successMessage && (
          <div className="mt-6">
            <SuccessNotification message={successMessage} />
          </div>
        )}
        {errorMessage && (
          <div className="mt-6">
            <FailedNotification message={errorMessage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddFeatureCourseForm;
