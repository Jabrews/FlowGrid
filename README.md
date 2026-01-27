Finished Project!
# FlowGrid
An Obsidian-inspired markdown note app with a drag-and-drop editor for note-taking, organization, and daily routine tracking.

<h1>Features</h1>

<ul>
  <li>
    <strong>Drag and Drop Editor</strong><br />
    <img src="frontend/src/assets/readme1.gif" alt="Demo GIF" width="600" />
  </li>

  <li>
    <strong>Premade Components to make your work easier</strong><br />
    <img src="frontend/src/assets/readme2.png" alt="Demo Screenshot" width="350" />
  </li>

  <li>
    <strong>Trackable components</strong><br/>
      <img src="frontend/src/assets/timer2.png" alt="Demo Screenshot" width="350" />
  </li>
  <li>
    <strong>Note Taking Interface</strong><br />
      <img src="frontend/src/assets/readme3.png" alt="Demo Screenshot" width="600" />
  </li>
  <li>
    <strong>Markdown Note Format</strong> <br />
      <img src="frontend/src/assets/readme4.gif" alt="Demo GIF" width="700" />
  </li>
</ul>

# Tech Stack
- **Frontend:** React, Zustand, React-Query, Sass(css), Vitest, React-Testing-Library
- **Backend:** Django w/ REST Framework  
- **Database:** PostgreSQL

## Installation
```bash
git clone https://github.com/jabrews/FlowGrid.git
cd frontend
npm install
npm run dev
```
```bash
cd ../backend
python3 -m venv venv
source venv/bin/activate # 'on Mac/Linux'
# or use: venv\Scripts\activate # 'on Windows'
pip install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py runserver
```


