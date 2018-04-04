const IdentifyingAttributes = require('./identifyingAttributes');
const Policy = require('../models/policy_schema');

const Fuse = require('fuse.js')
var hashTable = require('node-hashtable');

getPolicies = function (obj) {
    return new Promise((resolve, reject) => {
        return new Promise((pass,fail)=>{
            for (let i = 0; i < obj.resource.length ; i++) {

                let appid = hashTable.get('appid');
                let roles = hashTable.get('roles');
                let resname = obj.resource[i].resource_id.split('/')[2];

                Policy.findOne({
                    'policy_type'       : 'grant',
                    'application_id'    : appid._id,
                    'policy_targets'    : { $elemMatch: {'resource_name': resname } }
                    ,'policy_targets'    : { $elemMatch: {'resourceType_actions': { $elemMatch: {'action_name': obj.resource[i].action}}}}
                },
                    {'policy_constrains': 1, 'policy_targets' : 1 , '_id' : 0 },   
                )
                .where({ $or : [ { 'policy_principals.name' : obj.username } , { 'policy_principals.id' : { $in : roles} } ] })
                //.where({'policy_targets'    : { $elemMatch: {'resourceType_actions': { $elemMatch: {'action_name': obj.resource[i].action}}}}})
                .then(async policy=>{
                    // console.log('policy : ',policy);
                    if(policy == null ) reject('no policy found from given data !')
                    else if ( await IdentifyingAttributes.getPolicyConstraintAttributes(policy.policy_constrains)|| policy.policy_constrains == ( null || undefined || '' ) ){
                        var options = {
                            keys: ['resource_name' ]
                            ,id: 'resourceType_actions'
                            }
                        var fuse = new Fuse(policy.policy_targets, options)
                        // hashTable.add('privilage',fuse.search(obj.resource[i].action));
                        var actions = fuse.search(resname)
                        console.log('act_st: ', fuse.search(resname));

                        var options2 = {
                            keys: ['action_name' ]   }

                        var fuse2 = new Fuse(actions,options2)

                        hashTable.add('privilage',fuse2.search(obj.resource[i].action)[0].action_state);
                      
                    }
                    else{
                       console.log('in else cond');
                        hashTable.add('privilage',false);
                    
                    }
                    pass('ok!');
                })
                .catch(err=>console.log(err))
            }
        })
        .then(()=>{
            resolve('ok!')
        })
    })
}

exports.getPolicies = getPolicies;


