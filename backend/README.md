### Setup virtual env

Make sure you have virtual env setup in the `./backend` directory. I've used python 3.9.6 for this exercise.

Activate virtual env

```
source venv/bin/activate
```

This will start a new terminal with your virtual python environment.

### Install packages

install requirements using pip / pip3

```
(venv)$ pip3 install -r requirements.txt
```

### Run the backend using uvicorn

I've added the "uvicorn" package as a requirement to run the FastAPI server. Run the server like this:

```
(venv)$ uvicorn main:app --reload
```

If everything worked, you should see something like this in the console and the server will start up on http://localhost:8000

```
INFO:     Will watch for changes in these directories: ['/Users/asimmittal/Desktop/coh-th-ex/product-engineer-starter/backend']
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [78350] using StatReload
INFO:     Started server process [78352]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### Testing

A test file has been included in `test_main.py`. I've used `pytest` to spin up a test server and run the unit tests. The file contains a test for every API.

```
(venv)$ pytest
```

Output:

```
================================ test session starts =================================
platform darwin -- Python 3.9.6, pytest-8.1.1, pluggy-1.4.0
rootdir: /Users/asimmittal/Desktop/coh-th-ex/product-engineer-starter/backend
plugins: anyio-3.7.1
collected 3 items

test_main.py ...                                                                                                           [100%]

======================================================== warnings summary ========================================================
venv/lib/python3.9/site-packages/httpx/_client.py:680
  /Users/asimmittal/Desktop/coh-th-ex/product-engineer-starter/backend/venv/lib/python3.9/site-packages/httpx/_client.py:680: DeprecationWarning: The 'app' shortcut is now deprecated. Use the explicit style 'transport=WSGITransport(app=...)' instead.
    warnings.warn(message, DeprecationWarning)

-- Docs: https://docs.pytest.org/en/stable/how-to/capture-warnings.html
================================================= 3 passed, 1 warning in 30.86s ==================================================
```
