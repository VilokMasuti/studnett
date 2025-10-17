

import { useRef, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import CustomDropdown from "./CustomDropdown"
// Interest categories and their subcategories

const INTEREST_CATEGORIES = {
  Art: ["Painting", "Sculpture", "Digital Art", "Photography", "Graphic Design"],
  Sports: ["Cricket", "Football", "Basketball", "Tennis", "Swimming", "Badminton", "Volleyball"],
  Theatre: ["Acting", "Directing", "Stage Design", "Costume Design", "Playwriting"],
  Reading: ["Fiction", "Non-Fiction", "Poetry", "Comics", "Graphic Novels", "Mystery"],
  Music: ["Singing", "Guitar", "Piano", "Drums", "Violin", "Flute"],
  Science: ["Physics", "Chemistry", "Biology", "Astronomy", "Robotics", "Coding"],
  Dance: ["Classical", "Contemporary", "Hip-Hop", "Jazz", "Bollywood"],
  Debate: ["Public Speaking", "Argumentation", "Presentation", "Storytelling"],
}

const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"]

const StudentProfile = () => {

 const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      studentName: "",
      class: "",
      gender: "",
      interestCategory: "",
      subcategory: "",
      introduction: "",
    },
  })

  const selectedCategory = watch("interestCategory")
  const subcategories = selectedCategory?INTEREST_CATEGORIES[selectedCategory] : []
   const [isRecording, setIsRecording] = useState(false)
  const [audioBlob, setAudioBlob] = useState(null)
  const [audioUrl, setAudioUrl] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  return (
<section className="min-h-screen w-full flex flex-col lg:flex-row font-sans ">
  {/* IMAGE - always top until large screens, then left */}
  <div className="w-full lg:w-1/2 flex items-center justify-center  relative min-h-[200px] lg:min-h-screen">
    <img
      src="/std.png"
      alt="Student Room"
      className=" lg:absolute lg:right-[3%]
        w-[25rem] h-[350px] lg:h-full lg:w-full
        object-cover


        pointer-events-none select-none
      "
      draggable={false}
      aria-hidden="true"
    />

  </div>
    {/* Background Image */}



  {/* RIGHT SIDE: The form */}
  <div className="flex-1 flex items-center justify-center    p-2 md:p-4">
    <div className="w-full max-w-lg md:max-w-2xl   border border-amber-100 rounded-3xl p-4 md:p-8 shadow-2xl">
      {/* Header */}

      <p className="text-gray-700 text-center text-sm md:text-base font-sans    mb-6">
        Complete your profile and record a short introduction
      </p>
      <form onSubmit={""} className="space-y-5">
        {/* Student Name */}
        <div className="text-gray-950 font-sans ">
          <label className="block text-sm  mb-1 tracking-wide font-medium  text-gray-950 font-sans ">
            Student Name <span className="text-red-500">*</span>
          </label>
          <Controller
            name="studentName"
            control={control}
            rules={{ required: "Student name is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Enter your full name"
                className="w-full rounded-xl border border-black/20 bg-transparent px-4 py-3 text-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-black/80 focus:border-black/90"
              />
            )}
          />
          {errors.studentName && <p className="text-red-500 text-xs mt-1">{errors.studentName.message}</p>}
        </div>

        {/* Class */}
        <div>
          <label className="block text-sm  mb-1 tracking-wide font-medium  text-gray-950 font-sans">Class <span className="text-red-500">*</span></label>
          <Controller
            name="class"
            control={control}
            rules={{ required: "Class is required" }}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="e.g., 10A, 12B"
                className="w-full rounded-xl border border-black/20 bg-transparent px-4 py-3 text-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-black/80 focus:border-black/90"
              />
            )}
          />
          {errors.class && <p className="text-red-500 text-xs mt-1">{errors.class.message}</p>}
        </div>










        {/* Gender */}
        <div className="gap-5 flex flex-col bg-amber-50">

            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <CustomDropdown
                  label="Gender"
                  field={field}
                  options={GENDER_OPTIONS}
                  placeholder="Select gender"
                  error={errors.gender?.message}

                />
              )}
            />

            <Controller
              name="interestCategory"
              control={control}
              rules={{ required: "Interest category is required" }}
              render={({ field }) => (
                <CustomDropdown
                  label="Interest Category"
                  field={field}
                  options={Object.keys(INTEREST_CATEGORIES)}
                  placeholder="Select category"
                  error={errors.interestCategory?.message}
                />
              )}
            />

            {subcategories.length > 0 && (
              <Controller
                name="subcategory"
                control={control}
                rules={{ required: "Subcategory is required" }}
                render={({ field }) => (
                  <CustomDropdown
                    label="Subcategory"
                    field={field}
                    options={subcategories}
                    placeholder="Select subcategory"
                    error={errors.subcategory?.message}
                  />
                )}
              />
            )}

        </div>











        {/* Student Introduction */}
        <div>
          <label className="block text-sm  mb-1 tracking-wide  font-normal   text-gray-950 font-sans">Student Introduction <span className="text-red-500">*</span></label>
          <Controller
            name="introduction"
            control={control}
            rules={{ required: "Introduction is required" }}
            render={({ field }) => (
              <textarea
                {...field}
                placeholder="Write a brief introduction about yourself..."
                rows={4}
                className="w-full rounded-xl border border-black/20 bg-transparent px-4 py-3 text-lg  font-sans font-normal transition resize-none focus:outline-none focus:ring-2 focus:ring-black/80"
              />
            )}
          />
          {errors.introduction && <p className="text-red-500 text-xs mt-1">{errors.introduction.message}</p>}
        </div>

        {/* Audio Recording Section */}
        <div className="rounded-2xl border border-black/15  px-5 py-6 flex flex-col gap-4 items-start">
          <h3 className="text-lg  font-sans text-shadow-zinc-950 mb-1">Audio Introduction <span className="text-red-500">*</span></h3>
          <div className="flex flex-col md:flex-row gap-2 w-full">
            <button
              type="button"
              onClick={""}
              disabled={isRecording}
              className="w-full md:w-1/2   font-sans rounded-lg bg-black text-white font-semibold py-2 transition focus:ring-2 focus:ring-black/60 disabled:opacity-40 cursor-pointer"
            >
              {isRecording ? "Recording..." : "Start Recording"}
            </button>
            <button
              type="button"
              onClick={""}
              disabled={!isRecording}
              className="w-full md:w-1/2 rounded-lg  font-sans   text-white font-semibold py-2 transition bg-red-500  focus:ring-2  disabled:opacity-40 cursor-pointer"
            >
              Stop Recording
            </button>
          </div>
          {/* Audio Preview */}
          {audioUrl && (
            <div className="w-full flex flex-col gap-2 mt-2">
              <audio src={audioUrl} controls className="w-full" />
              <button
                type="button"
                onClick={""}
                className="rounded-lg py-2 font-semibold border border-black hover:bg-gray-200 transition w-full font-sans"
              >
                Clear Recording
              </button>
            </div>
          )}
          {!audioUrl && (
            <p className="text-sm text-gray-400 mt-1 font-sans">
              No recording yet. Tap “Start Recording” to begin.
            </p>
          )}
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl  text-lg font-sans font-normal bg-black text-white transition  disabled:opacity-60 shadow-lg mt-2 cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Submit Profile"}
        </button>
      </form>
      {/* Migration Notes (unchanged) */}

      <div className="mt-8 pt-6 border-t border-gray-300 text-xs text-gray-600">
          <p className="font-semibold font-sans text-black mb-2">React Native Migration Notes:</p>
          <ul className="list-disc list-inside space-y-1 font-sans font-normal">
            <li>Replace MediaRecorder API with Expo.Audio or react-native-audio-recorder-player</li>
            <li>Replace form inputs with React Native TextInput, Picker components</li>
            <li>Use react-native-fs for file handling instead of Blob/FormData</li>
            <li>Replace Tailwind CSS with React Native StyleSheet</li>
            <li>Audio compression logic remains the same (lamejs works on RN)</li>
          </ul>
        </div>

      </div>
    </div>

</section>

  )
}
export default StudentProfile
