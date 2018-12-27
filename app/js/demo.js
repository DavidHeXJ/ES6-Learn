require(
    ['snx/utils/saveAs','snx/biz/requestWithCsrf'],
    function (saveAs,request) {
        downloadPdf = function (url) {
            common.showProcessBar();
            downloader(url, {
                method: 'GET',
                handleAs: "blob"
            }).then(function () {
                common.hideProcessBar();
            }, function (error) {
                if(error.response.xhr.status != 200 && error.response.xhr.status != 503) {
                    var reader = new FileReader();
                    reader.readAsBinaryString(error.response.data);
                    reader.addEventListener("loadend", function() {
                        var result = JSON.parse(reader.result);
                        switch (result.status) {
                            case 400:
                                common.showError('Bad Request!!');
                                break;
                            case 401:
                                common.showError('Unautherized!!');
                                break;
                            case 403:
                                common.showError('Permission Denied!!');
                                break;
                            case 500:
                                common.showError(result.message ? result.message : 'Server Error, please contact qgen-support!');
                                break;
                        }
                    });
                } else {
                    if(error.response.xhr.status != 503) {
                        common.showError('Server Temporary Unavailable!!');
                    }
                }
                common.hideProcessBar();
            });
        };

        downloader = function (){
            var options = arguments[1] || {};
            options.method = 'GET';
            var dfd = request.apply(null, arguments).response;
            return dfd.then(function (response) {
                var fileName = response
                    .getHeader("Content-Disposition")
                    .match(/(attachment;filename=)(.+)/i)[2];
                if (!fileName) throw new Error('File Name Expected');
                saveAs(response.data, fileName);
            });
        }
    });
