from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from case import Case
from db import DB

# for this exercise, we'll use an in memory database 
# that utilizes both a dict and a list to simulate an index
# warning: It will wipe out when the server restarts ⚠️
db = DB()

# spin up a Fast API server here
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---------------------------------------------------------------------------
# POST /cases
# creates a new case with a unique id, adds it to our DB
@app.post("/cases")
async def create_case():
    try:
        case = Case()
        db.put(case.case_id, case)
        print(f"created case_id: {case.case_id}. Count: {db.length()}")
        return {"id": case.case_id}
    except Exception as err:
        msg = f"error in creating case: {str(err)}"
        raise HTTPException(status_code=500, detail=msg)

# ---------------------------------------------------------------------------
# GET /cases/<case_id>
# get a single case based on case_id
# the .to_json() function is used to handle time-based updates
@app.get("/cases/{case_id}")
async def get_case(case_id: str):
    try:
        # read a case
        case = db.get(case_id)

        # use the to_json() method to get its time-based value
        return case.to_json()
    except:
        raise HTTPException(status_code=404, detail="case not found")
    
# ---------------------------------------------------------------------------
# GET /cases
# get all the available cases in the DB using standard pagination
# e.g. /cases?page=1&size=20
@app.get("/cases")
async def get_all_cases(page: int = Query(1, alias="page"), size: int = Query(20, alias="size")):
    try:
        # this lambda will get the time-based status of each case
        getter = lambda case: case.to_json()

        # read the specified page from the DB, then run map it using
        # the lambda function above. This will give you the final json 
        # for all the cases in the current page
        list_of_cases = list(map(getter, db.paginate(page, size)))
        
        return {
            "total_items": db.length(),
            "current_page": page,
            "items": list_of_cases
        }
    except Exception as err:
        msg = f"error in fetching cases: {str(err)}"
        raise HTTPException(status_code=500, detail=msg)

# ---------------------------------------------------------------------------
# GET /
# return a list of app the available routes on this server
@app.get("/")
async def root():
    url_list = [{"path": route.path, "name": route.name} for route in app.routes]
    return url_list

