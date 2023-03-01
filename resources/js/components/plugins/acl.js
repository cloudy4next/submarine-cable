
const Acl = {
    install(Vue, options) {
        // If authorID id is equal to current userId permission is always granted
        Vue.prototype.$can = function (permission, authorId = false) {
            if (window.Laravel.userId == authorId) {
                return true;
            }
            if (window.Laravel.permissions.indexOf(permission)!==-1) {
                return true;
            }
        }
    }
};

module.exports = Acl;
