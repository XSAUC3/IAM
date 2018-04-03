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
                    'application_id'    : appid,
                    'policy_targets'    : { $elemMatch: {'resource_name': resname } },
                    'policy_targets'    : { $elemMatch: {'resourceType_actions': { $elemMatch: {'action_name': obj.resource[i].action}}}}
                },
                    {'policy_constrains': 1, 'policy_targets' : 1 , '_id' : 0 },   
                )
                .where({ $or : [ { 'policy_principals.name' : obj.username } , { 'policy_principals.id' : { $in : roles} } ] })
                //.where({'policy_targets'    : { $elemMatch: {'resourceType_actions': { $elemMatch: {'action_name': obj.resource[i].action}}}}})
                .then(async policy=>{
                    
                    if ( await IdentifyingAttributes.getPolicyConstraintAttributes(policy.policy_constrains) || policy.policy_constrains == ( null || undefined || '' ) ){
                        var options = {
                            keys: ['resourceType_actions.action_name' , 'resource_name']
                            ,id: 'resourceType_actions'
                            }
                        var fuse = new Fuse(policy.policy_targets, options)

                        console.log(fuse.search(resname)[0].action_state);
                         
                        if(fuse.search(resname)[0].action_state == undefined){
                            hashTable.add('privilage',false);
                        }
                        else{
                            hashTable.add('privilage',fuse.search(resname)[0].action_state);
                        }
                    }
                    else{
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