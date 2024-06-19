from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import uuid
from datetime import datetime


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for cases
cases = {}

# This is a mock background process that simulates a long running process
async def run_background_process(case_id: str):
    await asyncio.sleep(10)
    cases[case_id]["status"] = "processing"
    cases[case_id]["summary"] = "The patient, Mickey Mouse, presented with persistent lower back pain following a motor vehicle accident. Despite conservative management including NSAIDs, muscle relaxants, and physical therapy, the pain has not significantly improved. The medical records suggest that the pain has been present for more than 3 months and there are no acute neurologic deficits. Imaging did not provide a diagnostic explanation for the pain. The plan suggests a Medial Branch Block (MBB) as the next step in the diagnostic process. Based on the evidence, the patient appears to meet the criteria for a \"Diagnostic facet joint injection\" rather than a \"Therapeutic facet joint injection.\" The patient has also met the treatment criteria for NSAIDs and physical therapy or home exercise within the last year. However, the procedure, a facet joint injection, is not justified at this point as the patient has not yet undergone any diagnostic medial branch blocks or intra-articular zygapophysial joint injections. The next appropriate step would be to proceed with the diagnostic facet joint injection (MBB) as planned to confirm the diagnosis before considering therapeutic interventions."
    await asyncio.sleep(20)
    cases[case_id]["status"] = "complete"
    cases[case_id]["is_complete"] = True
    cases[case_id]["steps"] = [
        {
            "key": "0",
            "question": "Choose one of the following options and continue to the appropriate section",
            "options": [
                {"key": "10", "text": "Diagnostic facet joint injection", "selected": True},
                {"key": "20", "text": "Therapeutic facet joint injection", "selected": False}
            ],
            "decision": "10",
            "next_step": "10",
            "is_met": True,
            "is_final": False,
            "evidence": [
                {"content": "Assessment: Chronic lower back pain, possibly related to facet joint pathology, unresponsive to conservative treatment.", "page_number": 4, "pdf_name": "medical-record.pdf", "event_datetime": "2023-04-21T00:00:00"},
                {"content": "Facet Joints: Normal facet joint alignment without signs of subluxation or degenerative changes.", "page_number": 1, "pdf_name": "medical-record.pdf", "event_datetime": "2021-12-10T00:00:00"},
                {"content": "Musculoskeletal: Tenderness to palpation in the lower spine over facet joints. Slight limited range of motion due to discomfort. No deformities.", "page_number": 4, "pdf_name": "medical-record.pdf", "event_datetime": "2023-04-21T00:00:00"},
                {"content": "Service: Whole Body imaging (1 Advanced Imaging of Neck and Spine, MRA, and PET) Breast Procedures Cardiac Nuclear Medicine Cochlear Implant Dialysis Gastric Neurostimulator Genetic Testing Vein Surgery TMJ/Oral Splints/Oral Surgery Home Health Services Minimally invasive Spine Procedures Blepharoplasty/Ptosis Repair Wound Therapy Orthopedic Procedures In Lab Sleep Study TENS Neurostimulator Other", "page_number": 1, "pdf_name": "medical-record.pdf", "event_datetime": None},
                {"content": "COMPARISON: None - Patient involved in a motor vehicle accident, reporting lumbar pain. Initial encounter.", "page_number": 1, "pdf_name": "medical-record.pdf", "event_datetime": "2021-12-10T00:00:00"},
                {"content": "Plan: MBB: Suggest trying Medial Branch Block (MBB) to pinpoint pain-causing nerves. This procedure involves an anesthetic injection near key nerves. Risks will be explained.", "page_number": 5, "pdf_name": "medical-record.pdf", "event_datetime": "2023-04-21T00:00:00"},
                {"content": "Diagnostic Tests: Lumbar spine X-ray: No acute abnormalities, mild age-related changes.", "page_number": 3, "pdf_name": "medical-record.pdf", "event_datetime": "2021-12-10T00:00:00"},
                {"content": "Disc Spaces: Intervertebral disc spaces are preserved.", "page_number": 1, "pdf_name": "medical-record.pdf", "event_datetime": "2021-12-10T00:00:00"},
                {"content": "Management: Prescribed NSAIDs and muscle relaxants. Advised rest, heat/cold therapy, and physical therapy referral.", "page_number": 3, "pdf_name": "medical-record.pdf", "event_datetime": "2021-12-10T00:00:00"},
                {"content": "Normal lumbar spine X-ray post motor vehicle accident. No evidence of acute traumatic injury or significant pathology.", "page_number": 1, "pdf_name": "medical-record.pdf", "event_datetime": "2021-12-10T00:00:00"},
                {"content": "Diagnosis: Suspected lumbar strain with possible nerve root irritation secondary to motor vehicle accident.", "page_number": 3, "pdf_name": "medical-record.pdf", "event_datetime": "2021-12-10T00:00:00"},
                {"content": "PROCEDURE: XR Lumbar Spine, 4 views", "page_number": 1, "pdf_name": "medical-record.pdf", "event_datetime": "2021-12-10T00:00:00"}
            ]
        }
    ]

@app.post("/cases")
def create_case(background_tasks: BackgroundTasks):
   case_id = str(uuid.uuid4())
   case = {
        "id": case_id,
        "created_at": datetime.utcnow().isoformat(),
        "status": "submitted",
        "summary": None,
        "is_met": False,
        "is_complete": False,
        "steps": []
    }
   cases[case_id] = case
   # add the background process to the task queue
   background_tasks.add_task(run_background_process, case_id)
   return {"id": case_id}

@app.get("/cases/{case_id}")
def get_case(case_id: str):
    return cases.get(case_id, {"error": "Case not found"})

@app.get("/cases")
def get_all_cases():
    return [{"id": case_id, **case_data} for case_id, case_data in cases.items()]


@app.get("/")
def root():
    return {"message": "Hello World"}