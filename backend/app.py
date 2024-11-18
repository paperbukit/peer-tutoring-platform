from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, login_user

# Initialize Flask app and CORS
app = Flask(__name__)
CORS(app)

# Database setup
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  # SQLite Database
app.config['SECRET_KEY'] = 'your_secret_key'  # Use a secret key in production
db = SQLAlchemy(app)

# Initialize LoginManager
login_manager = LoginManager(app)
login_manager.login_view = 'login'

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    @property
    def is_active(self):
        return True  # All users are active in this case, change this logic as needed

    def get_id(self):
        return str(self.id)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

# StudyGroup model
class StudyGroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300), nullable=False)

    def __repr__(self):
        return f"StudyGroup('{self.name}', '{self.description}')"

# Create database tables
with app.app_context():
    db.create_all()

# Home route
@app.route('/')
def home():
    return "Welcome to the Peer Tutoring & Study Group Platform!"

# Register route (POST)
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()  # Get data from the request body
    username = data['username']
    email = data['email']
    password = data['password']
    
    # Hash the password before storing
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')
    
    # Create a new user and add to the database
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully!'}), 201

# Login route (POST)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    
    # Fetch user from the database by email
    user = User.query.filter_by(email=email).first()
    
    # Check if user exists and password matches
    if user and check_password_hash(user.password, password):
        login_user(user)
        return jsonify({'message': 'Logged in successfully!'}), 200
    return jsonify({'message': 'Invalid credentials!'}), 401

# Get all study groups route (GET)
@app.route('/study_groups', methods=['GET'])
def get_study_groups():
    study_groups = StudyGroup.query.all()  # Query all study groups from the database
    study_groups_list = [{"id": group.id, "name": group.name, "description": group.description} for group in study_groups]
    return jsonify({'study_groups': study_groups_list}), 200

# Create a new study group route (POST)
@app.route('/study_groups', methods=['POST'])
def add_study_group():
    data = request.get_json()
    name = data['name']
    description = data['description']
    new_group = StudyGroup(name=name, description=description)
    db.session.add(new_group)
    db.session.commit()
    return jsonify({'message': 'Study group created successfully!'}), 201

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
