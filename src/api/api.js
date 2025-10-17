export async function submitStudentProfile(formData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(" submission - Form data:")
      for (const [key, value] of formData.entries()) {
        if (value instanceof Blob) {
          console.log(`${key}: [Audio Blob - ${value.size} bytes]`)
        } else {
          console.log(`${key}: ${value}`)
        }
      }
      resolve({ success: true, message: "Profile submitted successfully" })
    }, 1000)
  })
}
