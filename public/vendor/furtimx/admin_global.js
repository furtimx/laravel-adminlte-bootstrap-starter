$.admin_global = {
    init: function () {

    },
    buttonLoadingState: function (_selector) {
        $(_selector).html('<i class="fa-solid fa-circle-notch fa-spin"></i>&nbsp;&nbsp;&nbsp;Loading...');
        $(_selector).prop("disabled", true);
    },
    resetButtonLoadingState: function (_selector, _button_text) {
        if ($.admin_global.isEmpty(_button_text))
            _button_text = 'Submit';

        $(_selector).html(_button_text);
        $(_selector).attr("disabled", false);
    },
    loadTippy: function () {
        setTimeout(() => {
            tippy('.tooltip-tippy', {
                placement: 'bottom',
            })
        }, 1500);

    },
    globalAlert: function (__message, __type, __timer) {
        if (__timer == null || __timer == "")
            __timer = 2000;

        if (__type == "success") {
            Swal.fire({
                icon: 'success',
                title: 'Hooray!',
                timer: __timer,
                timerProgressBar: true,
                text: __message,
            });
        }
        else if (__type == "warning") {
            Swal.fire({
                icon: 'warning',
                title: 'Warning!',
                timer: __timer,
                timerProgressBar: true,
                text: __message
            });
        }
        else if (__type == "error") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                timer: __timer,
                timerProgressBar: true,
                text: __message
            });
        }
        else {
            Swal.fire({
                icon: 'info',
                timer: __timer,
                timerProgressBar: true,
                text: __message
            });
        }
    },
    globalConfirmAction: function (__message, __type, __confirm_button_text) {
        if (__type == "delete") {
            if (__confirm_button_text == null || __confirm_button_text == "")
                __confirm_button_text = "Yes, delete it!";

            Swal.fire({
                title: 'Are you sure?',
                text: __message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: __confirm_button_text
            }).then((result) => {
                if (result.isConfirmed) {
                    if ($.admin_global.global_confirmation_callback != null) {
                        $.admin_global.global_confirmation_callback();
                        $.admin_global.global_confirmation_callback = null;
                    }
                }
                else if (!result.isConfirmed) {
                    if ($.admin_global.global_confirmation_cancel_callback != null) {
                        $.admin_global.global_confirmation_cancel_callback();
                        $.admin_global.global_confirmation_cancel_callback = null;
                    }
                }
            });
        }
        else {
            Swal.fire({
                title: 'Are you sure?',
                text: __message,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, confirm'
            }).then((result) => {
                if (result.isConfirmed) {
                    if ($.admin_global.global_confirmation_callback != null) {
                        $.admin_global.global_confirmation_callback();
                        $.admin_global.global_confirmation_callback = null;
                    }
                }
            });
        }
    },
    showGlobalLoadingScreen: function () {
        if ($('#__global_loading_screen').length <= 0) {
            var _html = "";
            _html += '<div class="modal fade" id="__global_loading_screen" data-backdrop="static" data-keyboard="false" tabindex="-1">';
            _html += '    <div class="modal-dialog modal-dialog-centered">';
            _html += '        <div class="modal-content">';
            _html += '            <div class="modal-body" style="text-align: center; font-size: 2em">';
            _html += '                <i class="fa-solid fa-spinner fa-spin"></i>&nbsp;&nbsp;&nbsp;Please wait...';
            _html += '            </div>';
            _html += '        </div>';
            _html += '    </div>';
            _html += '</div>';

            $('body').append(_html);
        }

        $("#__global_loading_screen").modal("show");

    },
    hideGlobalLoadingScreen: function () {
        setTimeout(() => {

            $("#__global_loading_screen").modal("hide");

            setTimeout(() => {
                $(".modal-backdrop").remove();
                $("#__global_loading_screen").remove();
            }, 600);

        }, 1000);
    },
    moneyFormat: function (amount, decimalPlaces = 2, symbol = '₱', decimalSeparator = '.', thousandsSeparator = ',') {
        amount = parseFloat(amount);
        decimalPlaces = parseInt(decimalPlaces);

        if (amount === 0 || !amount) {
            return symbol + '0.00';
        }

        let formattedAmount = amount.toLocaleString('en-US', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces
        });

        formattedAmount = formattedAmount.replace(/,/g, thousandsSeparator);
        formattedAmount = formattedAmount.replace(/\./g, decimalSeparator);

        if (amount < 0) {
            return '-' + symbol + formattedAmount;
        } else {
            return symbol + formattedAmount;
        }
    },
    getKeyByValue: function (_object, _value) {
        // rmbp 062422

        return Object.keys(object).find(key => object[key] === value);
    },
    searchObjectValueByID: function (_object, _search_value) {
        // rmbp 062422

        var _found_object = [];
        var _index = -1;

        _index = _object.findIndex(function (object) {
            return object.id == _search_value;
        });

        if (_index != -1) {
            _found_object = _object[_index];
            _found_object["index"] = _index;
        }

        return _found_object;
    },
    searchObjectValueByKey: function (_object, _search_key, _search_value) {
        // rmbp 060523
        var _found_object = [];
        var _index = -1;

        _index = _object.findIndex(function (object) {
            return object[_search_key] == _search_value;
        });

        if (_index != -1) {
            _found_object = _object[_index];
            _found_object["index"] = _index;
        }

        return _found_object;
    },
    limitString: function (_string, _character_limit) {
        // rmbp 062522

        if (_character_limit == undefined || _character_limit == null || _character_limit == "")
            _character_limit = 50;

        if (_string.length > _character_limit)
            _string = _string.substring(0, (_character_limit - 3)) + " ...";

        return _string;
    },
    isEmpty: function (_value) {
        // Returns:

        // true: undefined, null, "", [], {}
        // false: true, false, 1, 0, -1, "foo", [1, 2, 3], { foo: 1 }

        return (
            // null or undefined
            (_value == null) ||

            // has length and it's zero
            (_value.hasOwnProperty('length') && _value.length === 0) ||

            // is an Object and has no keys
            (_value.constructor === Object && Object.keys(_value).length === 0)
        )
    },
    upperCaseWords: function (_string) {
        if ($.admin_global.isEmpty(_string) == false)
            return _string.replace(/^(.)|\s(.)/g, function ($1) { return $1.toUpperCase(); })
        else
            return "";
    },
    slugString: function (_string, _separator) {
        if (!_separator) {
            _separator = '-';
        }
        _string = _string.replace(/\s+/g, ' ');
        return _string.replace(/\s+/g, _separator).toLowerCase();
    }
};

$(function () {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $.admin_global.init();
    // $.admin_global.loadTippy();
});
