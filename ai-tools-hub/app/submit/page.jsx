'use client'
import { useState } from "react";
import { addTools } from "../backend/server";
import Dashboard from "../components/dashboard/page";

export default function Submit(){
     const [formData, setFormData] = useState({
            toolName : '',
            description : '',
            websiteURL : '',
            categories : '',
            logo : ''
        
    })
    const [loading, setLoading] = useState(false)
    const [modalText, setModalText] = useState('')
    const [modal, setModal] = useState(false)

     async function handleSubmit(e){
        e.preventDefault()
        setLoading(true)
        try{
            const response = await addTools([formData])
            setModalText(response.message)
            
        }
        catch(err){
            setModalText('Something went wrong. Check network settings or try again')
        }
        finally{
            setModal(!modal) 
            setLoading(false)
            
        }
        
     }

     function handleInputChange(e){
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   function handleFileChange(e){
      const file = e.target.files[0]
      setFormData({
        ...formData,
        logo : file
      })
   }

   function closePopup(){
     setModal(!modal)
     formData.categories = ''
     formData.description = ''
     formData.logo = ''
     formData.toolName = ''
     formData.websiteURL= ''
   }

   return(
    <>
      <Dashboard/>
      <section className="max-w-xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-10">
  <h1 className="text-3xl font-bold text-center mb-6 text-gray-600">Submit a Tool</h1>
  <p className="text-center text-gray-600 mb-8">Share your AI tool with the community</p>

  <form onSubmit={handleSubmit}>
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">Tool Name*</label>
      <input type="text"
       className="w-full px-4 py-2 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500" 
       value ={formData.toolName}
       name = 'toolName'
       onChange={handleInputChange}
       />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">Description*</label>
      <textarea 
      className="w-full px-4 py-2 text-black  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
       rows="4"
       value ={formData.description}
       name ='description'
       onChange= {handleInputChange}
       ></textarea>
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">Website URL*</label>
      <input 
      type="url"
      className="w-full px-4 py-2 border text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
      value = {formData.websiteURL}
      name = 'websiteURL'
      onChange= {handleInputChange}
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 font-semibold mb-2">Upload Logo/Image</label>
      <input type="file" 
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      name = 'logo'
      value={formData.logo}
      onChange={handleFileChange}
       />
      <div className="mt-2">
        <img src="#" alt="Preview" className="w-20 h-20 object-cover rounded-lg" />
      </div>
    </div>

    
    <div className="mb-8">
      <label className="block text-gray-700 font-semibold mb-2">Categories (optional)</label>
      <input type="text"
       className="w-full px-4 py-2 border text-black  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
       onChange= {handleInputChange}
       value={formData.categories}
       name = 'categories'
       />
      <p className="text-xs text-gray-500 mt-2">Category tags help users find your tool more easily.</p>
    </div>

    <button type="submit" 
    className={`${loading ? 'bg-gray-600 cursor-not-allowed' : ''} w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}>
      {loading ? 'Submitting...' : 'Submit Tool'}
    </button>
  </form>
</section>




{modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-white rounded-md z-50">
          <div className="bg-primary p-5 rounded-md shadow-lg">
            <p className='text text-green-500 m-3 p-3'>{modalText}</p>
            <button onClick={closePopup} className="mt-3 bg-green-600 text-white text-primary p-3 rounded-md">
              Finish
            </button>
          </div>
        </div>
      )}

    </>
   )
}