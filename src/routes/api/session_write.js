
//
export async function get(req, res) {
  try{
//console.log(items)    
    req.session.token = "token123";
    res.writeHead(200, {
      'Content-Type': 'application/json'
    });
    res.end(JSON.stringify([]));
  } catch (err) {
    console.error(err);
    res.writeHead(500, {'Content-Type': 'application/json' });
  }  
}