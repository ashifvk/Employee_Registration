# Project Setup Instructions

## Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd Frontend/employee-reg
    ```

2. Install the required npm packages:

    ```bash
    npm install
    ```

3. Run the frontend development server:

    ```bash
    npm start
    ```

## Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd Backend
    ```

2. Create and activate a virtual environment:

    For **Windows**:
    ```bash
    python -m venv venv
    venv\Scripts\activate
    ```

    For **MacOS/Linux**:
    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install the required Python packages from `requirements.txt`:

    ```bash
    pip install -r requirements.txt
    ```

4. Run backend server:

    ```bash
    python manage.py runserver
    ```

## Additional Notes

- Ensure both frontend and backend servers are running concurrently for full functionality.
