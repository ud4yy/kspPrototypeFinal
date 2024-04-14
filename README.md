<p float="left">
  <img src="https://drive.google.com/uc?export=view&id=1wpQ9JehJmasz63HXvxUHZdHqIqeC5SCb" width="380" />
  <img src="https://drive.google.com/uc?export=view&id=1wntdMI8qxwuPO3LF_0Dx5X_6HPX38Rx3" width="380" /> 
</p>
<p float="left">
  <img src="https://drive.google.com/uc?export=view&id=1rBpg4EPslSM5pM83VS9w1IBrMkmz4iri" width="380" />
  <img src="https://drive.google.com/uc?export=view&id=1pQqxp9N4l_p0DjiqX7oOkOAADZY9Td9H" width="380" />
</p>
<p float="left">
  <img src="https://drive.google.com/uc?export=view&id=1Gz3hN2DOWFXYpLaMERJer0MZyBMCOMEe" width="380" />
  <img src="https://drive.google.com/uc?export=view&id=1hAiceESFe_Mkv7beDnsxsW_vU4GWOcOp" width="380" />
</p>


## Project Setup

This project utilizes Conda for managing the backend environment and npm for managing frontend dependencies. Follow these steps to set up the project:

### Backend Environment Setup

1. **Create Conda Environment:**
   ```bash
   cd /BACKEND
   conda env create -f environment.yml
   ```

2. **Activate Conda Environment:**
   ```bash
   conda activate accident
   ```

### Frontend Setup

3. **Navigate to Frontend Directory:**
   ```bash
   cd /frontend
   ```

4. **Install Frontend Dependencies:**
   ```bash
   npm install
   ```

5. **Build Frontend:**
   ```bash
   npm run build
   ```

6. **Serve Frontend:**
   ```bash
   serve -s build
   ```

### Running Backend Server

7. **Navigate to Backend Directory:**
   ```bash
   cd /BACKEND
   ```

8. **Download Weights:**
   Download 'best.pt' and 'pretrained_vit_weights.pth' from the provided [Google Drive link](https://drive.google.com/drive/folders/1DcKAHOW5jiahGnB7nNK7kWKqsTEzya7B).

9. **Paste Weights in Backend Directory:**
   Place the downloaded weights in `/BACKEND/weights`.

10. **Run Backend Server:**
    ```bash
    python manage.py runserver
    ```

### Additional Information

- **Drive Link for Weights:** [Google Drive](https://drive.google.com/drive/folders/1DcKAHOW5jiahGnB7nNK7kWKqsTEzya7B)

---

