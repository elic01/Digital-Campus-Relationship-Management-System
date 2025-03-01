from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/admin')
def admin():
    return render_template('admin.html')

@app.route('/reset')
def reset():
    return render_template('reset.html')

@app.route('/student')
def student():
    return render_template('student.html')

@app.route('lecturer')
def lecturer():
    return render_template('lecturer.html')    

if __name__ == '__main__':
    app.run(debug=True)