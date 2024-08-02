// Import the required modules
import express from "express";



// Import your helper functions for your first resource here
import {
  getArtists,
  getArtistsById,
  createArtists,
  updateArtistsById,
  deleteArtistsById,
} from "./artists.js";


// Import your helper functions for your second resource here
import {
  getAlbums,
  getAlbumsById,
  createAlbums,
  updateAlbumsById,
  deleteAlbumsById,
} from "./albums.js";



// Initialize the express app
const app = express();
// Retrieve the port number from environment variables
const PORT = process.env.PORT;

app.use(express.json()); // express.json() middleware is used to parse incoming JSON requests




// Artist Route Handlers

// Endpoint to retrieve all <artists>
app.get("/artists/", async function (req, res) { // insert try/catch for error handling
  try {
    // create variable to link getArtist function
    const artists = await getArtists();
    // send successful status with correct code and list of artists
    res.status(200).json({
      success : true,
      payload : artists
    })
  } catch {
    // error handling - send error code 400 with success=false and null payload
    res.status(400).json({
      success : false,
      payload : null
    })
  }
});

// Endpoint to retrieve a <artists> by id
app.get("/artists/:id", async function (req, res) 
{
  const id = req.params.id;
  const artists = await getArtistsById(id);
  if (!artists) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "Artist not found" } });
  }
  res.status(200).json({ status: "success", data: artists });
});

// Endpoint to create a new <artists>
app.post("/artists/", async function (req, res) {
  const data = req.body;
  const newArtist = await createArtists(data);
  if (!data) {
    return res
      .status(404)
      .json({ status: "fail", data: { msg: "No Artists submitted" } });
  }
  res.status(200).json({ status: "success", data: newArtist });
});

// Endpoint to update a specific <artists> by id
app.patch("/artists/:id", async function (req, res) {
});

// Endpoint to delete a specific <artists> by id
app.delete("/artists/:id", async function (req, res) {
});




// Albums Route Handlers

// Endpoint to retrieve all <albums>
app.get("/albums/", async function (req, res)  {
  try {
    const albums = await getAlbums();
    res.status(200).json({
      success : true,
      payload : albums
    })
  } catch {
    res.status(400).json({
      success : false,
      payload : null
    })
  }
  });
  
  // Endpoint to retrieve a <albums> by id
  app.get("/albums/:id", async function (req, res)
    {
      const id = req.params.id;
      const albums = await getAlbumsById(id);
      if (!albums) {
        return res
          .status(404)
          .json({ status: "fail", data: { msg: "Album not found" } });
      }
      res.status(200).json({ status: "success", data: albums });
    });
  
  // Endpoint to create a new <albums>
  app.post("/albums/", async function (req, res) {
    const data = req.body;
    const newAlbum = await createAlbums(data);
    if (!data) {
      return res
        .status(404)
        .json({ status: "fail", data: { msg: "No Album submitted" } });
    }
    res.status(200).json({ status: "success", data: newAlbum });
  });
  
  // Endpoint to update a specific <albums> by id
  app.patch("/albums/:id", async function (req, res) {
  });
  
  // Endpoint to delete a specific <albums> by id
  app.delete("/albums/:id", async function (req, res) {
  });





// Start the server and listen on the specified port
app.listen(PORT, function () {
  console.log(`Server listening on port ${PORT}`);
});