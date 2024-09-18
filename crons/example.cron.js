import { schedule } from 'node-cron';

function doCRONjob(){
    //Add logic here
}

schedule('*/30 * * * *', () => {
    console.log("Running Clean Up ------->");
    doCRONjob();
});

doCRONjob()
