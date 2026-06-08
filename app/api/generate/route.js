import clientPromise from "@/lib/mongodb";
export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);
    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("bitly");
    // check if the short url exists
    const doc = await collection.findOne({ shorturl: body.shorturl });
    if (doc) {
      return Response.json({
        success: false,
        error: true,
        message: "crap! url already exists.",
      });
    }
    const res = await collection.insertOne({
      url: body.url,
      shorturl: body.shorturl,
    });
    return Response.json({
      success: true,
      error: false,
      message: "finished! url generated successfully.",
    });
  } catch (error) {
    console.error("Error generating URL:", error);
    return Response.json({
      success: false,
      error: true,
      message: "Server error: " + error.message,
    }, { status: 500 });
  }
}
