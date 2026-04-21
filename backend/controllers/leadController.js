import Leads from "../models/Lead.js";

export const createLead = async (req, res) => {
  try{
    const {name, email, status} = req.body;

    if(!name || !email || !status){
      return res.status(400).json({
         status: "N", error: `All fields are required`
      });
    }

    const newLead = new Leads({
       name, email, status
    });

    await newLead.save();

    res.status(201).json({ status: "Y", message: "Thank You! We will contact you ASAP"});
    
  } catch(error) {
    console.log(error);
    res.status(500).json({ status: "N", message: `Internal Server Error: ${error}`});
  }
}


export const allLeads = async (req, res) => {
  try{
    const leads = await Leads.find();

    if(!leads || leads.length === 0){
      return res.status(400).json({
         status: "N", error: `No leads found`
      });
    }
    res.status(200).json({ status: "Y", message: "Success", data: leads });
  } catch(error) {
    console.log(error);
    res.status(500).json({ status: "N", message: `Internal Server Error: ${error}`});
  }
}

export const updateLead = async (req, res) => {
  try{
     const {id} = req.params;
     const {name, email, status} = req.body;

     if(!name || !email || !status){
      return res.status(400).json({
         status: "N", error: `All fields are required`
      });
    }

     const lead = await Leads.findById(id);
   
     if(!lead || lead.length === 0){
      return res.status(404).json({ status: "N", message: "Lead not found" });
     }  

     const updatedLead = await Leads.findByIdAndUpdate(id, {name, email, status});
     
     return res.status(201).json({ status: "Y", message: "Lead updated successfully", data: updatedLead });
  } catch(error) {
    console.log(error);
    res.status(500).json({ status: "N", message: `Internal Server Error: ${error}`});
  }
}

export const deleteLead = async (req, res) => {
  try{
     const {id} = req.params;
      const lead = await Leads.findById(id);

      if(!lead || lead.length === 0){
        return res.status(404).json({ 
          status: "N", message: "Lead not found" 
        });
      }
      await lead.remove();
      res.status(200).json({ status: "Y", message: "Lead deleted successfully" });
  } catch(error) {
    console.log(error);
    res.status(500).json({ status: "N", message: `Internal Server Error: ${error}`});
  }
}

export const getLeadById = async (req, res) => {
  try{
      const {id} = req.params;
      const lead = await Leads.findById(id);

      if(!lead || lead.length === 0){
        return res.status(404).json({ status: "N", message: "Lead not found" });
      }
      res.status(200).json({ status: "Y", message: "Success", data: lead });
  } catch(error){
    console.log(error);
    res.status(500).json({ status: "N", message: `Internal Server Error: ${error}`});
  }
}