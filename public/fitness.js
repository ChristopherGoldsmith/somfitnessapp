    let loginMod = {
        login: '',
        init: function(){
            this.popDom()
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function(){
            this.container1 = document.getElementById('container');
            this.username = document.getElementById('username');
            this.password = document.getElementById('password');
            this.submit = document.getElementById('submit1');
            this.newID = document.getElementById('newID');
            this.test = document.getElementById('test');
        },
        parts: ['Chest', 'Back', 'Legs', 'Shoulders'],
        clearData: function(){
            localStorage.clear();
        },
        saveData: async function(data){
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
                }
            fetch('/users', options).then(response =>
            console.log(response))
        },
        createNewID: async function(){
            const response = await fetch('/users');
            const data = await response.json();
            unInput = this.username.value;
            pwInput = this.password.value;
            x = 0;
            un = data[x].username;
            pw = data[x].password;
            for(item of data){
                if (unInput == un){
                    alert('This Username is already in use, please try another');
                    return;
                }
                x = x + 1;
            }
            let newInfo = function(u, p){
                this.username = u,
                this.password = p
            };
            info = new newInfo(unInput, pwInput);
            this.saveData(info);
            alert(`Your new account ${this.username} has been created`);
        },
        loginUser: async function(un, pw){
            const response = await fetch(`/authUsers/${un}/${pw}`);
            const data = await response.json();
            let a = 0
            let verif = false;
            for(item of data){
                if(data[a].username === un){
                    if(data[a].password == pw){
                        console.log('super success!')
                        this.login = data[a];
                        console.log(data[a]);
                        verif = true;
                    };
                } else{
                    console.log(data[a].username);
                    a = a + 1;
                }
            };
            if(verif == true){
              console.log(`Welcome ${this.login}!`); 
              return mainUI.init();     
            } else{
                alert('You have entered your username or password incorrectly');
            };
            console.log(data);
        },
        bindEvents: function(){
            this.submit.addEventListener('click', this.clkSubmit.bind(this));
            this.newID.addEventListener('click', this.createNewID.bind(this));
            this.test.addEventListener('click', this.clearData.bind(this));
        },
        create: function(type, attach, text, css, id){
            let newDiv = document.createElement(type);
            if(type != 'input'){
                txt = document.createTextNode(text);
                newDiv.appendChild(txt);
                newDiv.className = css;
                attach.appendChild(newDiv);
            };
            if(type == 'input'){
                newDiv.placeholder = text;
                box = document.createElement('div')
                box.className = css;
                box.appendChild(newDiv)
                attach.appendChild(box);
            }
            newDiv.id = id;
            return newDiv;
        },  
        popDom: function(){
            x = document.getElementById('container');
            x.innerHTML = '';
            un = this.create('input', x, 'Username', 'userInput', 'username');
            pw = this.create('input', x, 'Password', 'userInput', 'password');
            pw.type = 'password';
            sub = this.create('div', x , 'Submit', 'submitButton', 'submit1');
            newID = this.create('div', x, 'New Account', 'accButton', 'newID' )
        },
        clkSubmit: function(){
            this.loginUser(this.username.value, this.password.value);
            
        },
        popWorkoutModule: function(){
            console.log(this.parts);
            y = this.parts.length;
            x.innerHTML = '';
            for(i = 0; y > i; i++){
                this.create('div', this.container1, this.parts[i], 'textbox', this.parts[i]);
            }
            this.create('div', this.container1, 'Sumbit', 'submitButton', 'submit2');
        }
    }
    let mainUI = {
        init: function(){
            this.popDom();
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function(){
            this.container = document.getElementById('container');
            this.workout = document.getElementById('workout');
            this.profile = document.getElementById('profile');
            this.createTrainingPlan = document.getElementById('createTrainingPlan');
            this.nutrition = document.getElementById('nutrition');
        },
        popDom: function(){
            x = document.getElementById('container');
            x.innerHTML = '';
            workout = loginMod.create('div', x, 'WORKOUT!', 'textbox', 'workout');
            profile = loginMod.create('div', x, 'Profile', 'textbox', 'profile');
            createTrainingPlan = loginMod.create('div', x, 'New Training Plan', 'textbox', 'createTrainingPlan');
            nutrition = loginMod.create('div', x, 'Nutrition', 'textbox', 'nutrition');
            /*Top bar has hamburger menu[profile, settings, stats], name and date.  buttons for previous workouts, create workout
            */
        },
        bindEvents: function(){
            this.workout.addEventListener('click', workoutMod.init.bind(workoutMod));
            //this.profile.addEventListener('click', profileMod.init.bind());
            //this.createTrainingPlan.addEventListener('click', trainngPlanMod.bind());
            //this.nutrition.addEventListener('click', nurtitionMod.init.bind());
        },
    };
    let workoutMod = {
        init: function(){
            this.popDom();
            this.cacheDom();
            this.bindEvents();
        },
        cacheDom: function(){
            this.container = document.getElementById('container');
            this.newWorkout = document.getElementById('newWorkout');
            this.useTP = document.getElementById('useTP');
            this.prevWorkout = document.getElementById('prevWorkout');
            this.profile = localStorage.getItem(loginMod.login);
        },
        popDom: function(){
            x = document.getElementById('container');
            x.innerHTML = '';
            createWorkout = loginMod.create('div', x, 'New Workout!', 'textbox', 'newWorkout');
            useTP = loginMod.create('div', x, 'Follow Training Plan', 'textbox', 'useTP');
            usePrevWorkout = loginMod.create('div', x, 'Use Past Workout', 'textbox', 'prevWorkout');
        },
        bindEvents: function(){
            this.newWorkoutFun.init();
            //this.newWorkout.addEventListener('click', this.newWorkoutFun.init.bind(newWorkoutFun));
        },
        newWorkoutFun:{
            init: function(){
                this.popDom();
                this.cacheDom();
                this.bindEvents();
            },
            cacheDom: function(){
                this.container = document.getElementById('container');
                this.newExc = document.getElementById('newExc');
                this.excName = document.getElementById('excName');
                this.excWeight = document.getElementById('excWeight');
                this.excVolume = document.getElementById('excVolume');
                this.excSubmit = document.getElementById('excSubmit');
                this.excContainer = document.getElementById('excContainer');
                this.wrkSubmit = document.getElementById('wrkSubmit');
            },
            bindEvents: function(){
                this.excSubmit.addEventListener('click', this.createExc.bind());
                this.wrkSubmit.addEventListener('click', this.finalizeWrk.bind());
            },
            popDom: function(){
                x = document.getElementById('container');
                x.innerHTML = '';
                newExc = loginMod.create('div', x, '', '', 'newExc');
                y = document.getElementById('newExc');
                excName = loginMod.create('input', y, 'Name', '', 'excName');
                excWeight = loginMod.create('input', y, 'Weight', '', 'excWeight');
                excReps = loginMod.create('input', y, 'Reps', '', 'excReps');
                excVolume = loginMod.create('input', y, 'Sets', '', 'excVolume');
                excSubmit = loginMod.create('button', y, 'Create', '', 'excSubmit');
                wrkSubmit = loginMod.crete('button', y, 'Finalize', '', 'wrkSubmit');                excContainer = loginMod.create('div', x, '', '', 'excContainer');
            },
            finalizeWrk: function(){
              //do this next!
              //
              //
              //  
            },
            saveExer: function(){
                this.name = arguments[0];
                this.weight = arguments[1];
                this.volume = arguments[2];
            },
            createExc: function(){
                a = this.excName.value;
                b = this.excWeight.value;
                c = this.excReps.value;
                d = this.excVolume.value;
                style = 'textbox2';
                root = loginMod.create('div', this.excContainer, '', style, 'root');
                e = document.getElementById('root');
                //make table format!
                volume = loginMod.create('div', e, `${a}: ${b} pounds for ${d} sets of ${c} reps`, style, '');
            }
        }
    };

loginMod.init();

/* 
-First screen is profile screen asking for login info or to create account.
-Hamburger Menu in top left with workout histoory and profile details.
-Create workout = primary / secondary (can choose 1 twice to create double workout,
or only choose 1 for half workout) with option for strength hypertrophy or hybrid
runs both in system then generates a 5-7 exercise workout.
-Has timer for workouts based on type (str or hyp).
-Exercises are objects with attributes showing muscle groups used to perform excersize,
with a rating on how much they are worked (maybe 1-5) and the primary group of muscles
the excesize is used to workout.
-Success or fail on each exersize.  Buttons for reps and time, this will determine what
your next workout weight needs to be.  
-A focus opetion for focusing onn any perticular muscle.

Main screen - Create workout (has options to save workout, has option to use template
exercises and to creat your own excercises);
-Use saved workout
-Training progress chart.  Chart showing logged workouts, str progress, weight, bodyfat%
cardio progress, other records;  Want trackable things for other things such as mma.

Biggest gains leader board (Only available to those that have logged 10+ workouts, seperated into fitness
level categories and types of workout);

*/
let workoutModule = {
    init: function(){
        this.cacheDom();
        this.bindEvents();
        this.render();
    },
    cacheDom: function(){
        this.container1 = document.getElementById('container');
        this.workout = document.getElementById('workouts');
        this.days = document.getElementById('days');
        this.chest = document.getElementById('Chest');
        this.shoulders = document.getElementById('Shoulders');
        this.back = document.getElementById('Back');
        this.legs = document.getElementById('Legs');
        this.submit = document.getElementById('submit2');
        this.chosen = [];
        this.volume = [];
        this.workout1 = [];
        this.test = document.getElementById('test');
    },
    bindEvents:function(){
        this.chest.addEventListener('click', this.clicked.bind(this, this.chest, this.training.chest));
        this.shoulders.addEventListener('click', this.clicked.bind(this, this.shoulders, this.training.shoulders));
        this.back.addEventListener('click', this.clicked.bind(this, this.back, this.training.back));
        this.legs.addEventListener('click', this.clicked.bind(this, this.legs, this.training.legs));
        this.submit.addEventListener('click', this.submitButton.bind(this, this.training.chosen));
        this.test.addEventListener('click',this.initWorkout.bind());
    },
    ranN: function(num){
        return Math.floor(Math.random() * num);
    },
    //render:,
    training: {
        chest: {
            pri: ['Push Ups', 'Dumbell Press', 'Bench Press'],
            acc: ['Dumbbell Flys', 'Incline Pushups', 'Incline Press']
        },
        shoulder: {
            pri: ['Shoulder Press'],
            acc: ['Front Raises', 'Reverse Flys', 'Lateral Raises']
        },
        back: {
            pri: ['Barbbell Rows'],
            acc: ['Dumbbell Rows', 'Shrugs', 'Closegrip Rows']
        },
        legs: {
            pri:['Squats', 'Weighted Squats'],
            acc:['Lunges', 'Romanian Deadlifts']
        },
        extra: {
            core: ['Crunches', 'Leg Raises', 'Bycicle Kicks'],
            cardio: ['Running', 'Biking']
        }
    },
    //training gexcersise genertor, use call or apply function to generate it;
    generateTraining: function(){
        this.exercise = arguments[0];
        this.weight = arguments[1];
        this.distance = arguments[2];
        this.time = arguments[3];  //speed for cardio only;
        this.volume = arguments[4]; //
        this.rest = arguments[5]; //rest between sets
        this.record = arguments[6]; // pr for exercise
        this.bodyParts = arguments[7]; //an array containing the part this exercises
    },
    //
    makeInput: function(div){
        loginMod.create('input', div, '', 'input', `input${i}`)
    },
    //!
    clicked: function(i, a){
        if(i.className != 'clicked' && this.chosen.length < 2){
            i.className='clicked';
            this.chosen.push(a);
        } else if(i.className == 'clicked' && this.chosen.length <= 2){
            i.className = 'textbox';
            j = this.chosen.indexOf(a);
            this.chosen.splice(j, 1);
        } else if(i.className != 'clicked' && this.chosen.length == 2){
            //blank
        }
    },
    //!
    trainingSelector: function(cho, vol){
        e = 1
        for(i = 0; i < cho.length; i++){
            num = this.ranN(cho[i].pri.length);
            a = cho[i].pri[num];
            e =+ 1;
            loginMod.create('div', this.container1, `${a}: ${pounds} x ${reps}`, 'textbox', `exersise${e}`);
            for(j = 0; j < vol[i]; j++){
                num2 = this.ranN(cho[i].acc.length);
                b = cho[i].acc[num2]
                e =+1;
                loginMod.create('div', this.container1, `${b}: ${pounds} x ${reps}`, 'textbox', `exersise${e}`);
            }
        }
    },
// create volume selector
// creates an input that allows you to enter a number 0-9 which determines the number of acc;
    volumeSelector: function(v){
        return this.volume.push(v);
    },
/*create primary and acc excersises for 1+ categories.
have a pri, then a number of acc requested/reccomended both in a variable.
*/

    printWorkout: function(x, y){
            n = this.ranN(x.length)
            loginMod.create('div', this.container1, `${x[n]} for 10 reps`, 'textbox', `exersise${y}`)
    },
    submitButton: function(){
        //t=Object.keys(this.chosen[0])
        //console.log(this.chosen[0].pri[0])
        this.container1.innerHTML = '';
        this.trainingSelector(this.chosen, 2);
    },
    /*createWorkout: function(){
        workout1.push(this.training.arguments[i].pri[]);
        workout1.push(this.training.arguments[i].acc[]);
    },*/

    initWorkout: function(){
        if(workoutModule.chosen.length == 2){
            this.test.addEventListener('click', this.createWorkout.bind(this, workoutModule.workout1))
        } else{
            alert('pick more workouts');
        }
    }
};