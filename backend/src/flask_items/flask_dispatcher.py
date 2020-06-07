import os
from flask import Flask, flash, request, redirect, url_for, jsonify
from model.pulse_controller import PulseController
import json
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = 'C:\\Users\\kreilly\\Desktop\\Pulse\\backend\\database\\pulse.db'
ALLOWED_EXTENSIONS = {'xls', 'csv', 'xlsx'}

app = Flask(__name__)
#This config is used for the file import process
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['SESSION_TYPE'] = 'filesystem'
app.secret_key = 'some secret key'


controller = PulseController()


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


    
#This is the route that accepts the new account form and appends to DB
@app.route('/api/post-new-account', methods = ['POST'])
def newaccount():
    data = request.get_json()
    controller.CreateNewAccount(new_account_form = data)
    return data
#This is the route that gets all active accounts from the Account table
@app.route('/api/fetch-list-of-accounts')
def fetchListOfAccounts():
    account_list = controller.FetchAccountsForUpdateAccountPage()
    account_list = json.dumps(account_list)
    return account_list
#This route accepts the update account form
@app.route('/api/update-existing-account', methods = ['POST'])
def uploadExistingAccountForm():
    print(request)
    return request


@app.route('/api/form-upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('uploaded_file',
                                    filename=filename))
    return 'didnt get a post'


if __name__ == "__main__":
    app.run(debug=True)
