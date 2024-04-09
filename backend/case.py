from typing import List, Optional
from uuid import uuid4
from time import time
import json

def gen_case_id():
    # using this for now, but can be a bit more scalable later on
    return "case_" + str(uuid4()).split("-")[0]

class Case:
    def __init__(self):
        """ constuctor. assigns a unique case_id """
        # base columns created with dynamic values in real time
        self.case_id = gen_case_id()
        self.created_at = time()
        self.status = "submitted"

        # the other columns will be pulled from the JSON files
        # since we're mocking these responses anyway

    def to_json(self):
        """ 
        this method handles the time based updates by reading from the json files provided 
        dynamic fields (status, is_complete etc) are updated after the fact
        """
        delta_in_secs = time() - self.created_at
        file_path = "../assets/response-1.json"
        status = self.status

        if (delta_in_secs >= 10) and (delta_in_secs < 30):
            file_path = "../assets/response-2.json"
            status = "processing"
        elif (delta_in_secs >= 30):
            file_path = "../assets/response-3.json"
            status = "complete"
        
        try:
            with open(file_path, 'r') as file:
                json_data = json.load(file)
                json_data["case_id"] = self.case_id
                json_data["status"] = status
                json_data["created"] = self.created_at
                return json_data
        except Exception as err:
            print(f"Error in reading json file: {err}")
            return None



