from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import LoginManager, login_user

# Initialize Flask app and database
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  # SQLite database
app.config['SECRET_KEY'] = 'your_secret_key'  # Use a secure key in production
db = SQLAlchemy(app)

# Initialize LoginManager for user authentication
login_manager = LoginManager(app)
login_manager.login_view = 'login'  # Redirect to 'login' route if user is not logged in

# Define the User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(120), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"

# Define the StudyGroup model
class StudyGroup(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300), nullable=False)

    def __repr__(self):
        return f"StudyGroup('{self.name}', '{self.description}')"

# Define the Tutor model
class Tutor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    subjects = db.Column(db.String(200), nullable=False)  # List of subjects the tutor teaches
    available_days = db.Column(db.String(100), nullable=False)  # Days when the tutor is available
    bio = db.Column(db.String(500), nullable=True)  # Optional short biography

    def __repr__(self):
        return f"Tutor('{self.name}', '{self.subjects}')"

# Home route
@app.route('/')
def home():
    return "Welcome to the Peer Tutoring & Study Group Platform!"

# User registration route
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()  # Get data from the request body
    username = data['username']
    email = data['email']
    password = data['password']
    
    # Hash the password before storing
    hashed_password = generate_password_hash(password, method='sha256')
    
    # Create a new user and add to the database
    new_user = User(username=username, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully!'}), 201

# User login route
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

# Get all study groups route
@app.route('/study_groups', methods=['GET'])
def get_study_groups():
    study_groups = StudyGroup.query.all()  # Query all study groups from the database
    
    # Create a list of study groups to return as JSON
    study_groups_list = [{"id": group.id, "name": group.name, "description": group.description} for group in study_groups]
    
    return jsonify({'study_groups': study_groups_list}), 200

# Create a new study group route
@app.route('/study_groups', methods=['POST'])
def add_study_group():
    data = request.get_json()
    name = data['name']
    description = data['description']
    
    # Create a new study group and add it to the database
    new_group = StudyGroup(name=name, description=description)
    db.session.add(new_group)
    db.session.commit()
    
    return jsonify({'message': 'Study group created successfully!'}), 201

# Get all tutors route
@app.route('/tutors', methods=['GET'])
def get_tutors():
    tutors = Tutor.query.all()  # Query all tutors from the database
    
    # Create a list of tutors to return as JSON
    tutors_list = [{"id": tutor.id, "name": tutor.name, "email": tutor.email, "subjects": tutor.subjects, "available_days": tutor.available_days, "bio": tutor.bio} for tutor in tutors]
    
    return jsonify({'tutors': tutors_list}), 200

# Create a new tutor route
@app.route('/tutors', methods=['POST'])
def add_tutor():
    data = request.get_json()
    name = data['name']
    email = data['email']
    subjects = data['subjects']
    available_days = data['available_days']
    bio = data.get('bio', '')  # Bio is optional, so we provide a default empty string if not provided
    
    # Create a new tutor and add to the database
    new_tutor = Tutor(name=name, email=email, subjects=subjects, available_days=available_days, bio=bio)
    db.session.add(new_tutor)
    db.session.commit()
    
    return jsonify({'message': 'Tutor added successfully!'}), 201

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
