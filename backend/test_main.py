from fastapi.testclient import TestClient
from main import app
from time import sleep

client = TestClient(app)
ids = [];

# ---------------------------------------------------------------------------
def test_create():
    """
    test POST /cases
    - repeat this process 5 times:
        - make the POST request
        - check if the resp was 200 OK
        - check if the "id" returned in the response is a valid string
        - check if the id is unique (does not occur previously)
    """
    
    for i in range(0, 5):
        response = client.post("/cases")
        obj = response.json()
        assert response.status_code == 200
        assert len(obj["id"]) > 0
        assert obj["id"] not in ids
        ids.append(obj["id"])
        sleep(0.1)

# ---------------------------------------------------------------------------

def test_get_all():
    # read all cases. the no. of cases must be equal to
    # the number of cases saved in the first test
    gResp = client.get("/cases?page=1&size=20")
    ob = gResp.json()
    items = ob["items"]
    assert len(ids) == len(items)

    # get all the "case_id"s from the items just fetched
    getter = lambda item: item["case_id"]
    case_ids = list(map(getter, items))

    # each of these case_ids must exist in the 'ids' list
    for i in range(0, len(case_ids)):
        case_id = case_ids[0]
        assert case_id in ids

# ---------------------------------------------------------------------------
def test_get_case():
    """
    test GET /cases/<case_id>
    - first create a case, keep its id
    - then query that id -> GET /cases/<it_to_test> 3 times over 30 seconds
    - ensure its status changes appropriately with time
    """

    fResp = client.post("/cases")
    obj = fResp.json()
    id_to_test = obj["id"]
    
    def run(id_to_get, status):
        url = "/cases/" + id_to_get
        resp_sub = client.get(url)
        ob_sub = resp_sub.json()
        assert resp_sub.status_code == 200
        assert ob_sub["case_id"] == id_to_get
        assert ob_sub["status"] == status

    run(id_to_test, "submitted"); sleep(10)
    run(id_to_test, "processing"); sleep(20)
    run(id_to_test, "complete")


