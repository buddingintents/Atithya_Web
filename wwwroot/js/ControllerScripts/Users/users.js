/**
 * Page User List
 */

'use strict';

// Datatable (jquery)
$(function () {
  let borderColor, bodyBg, headingColor;

  if (isDarkStyle) {
    borderColor = config.colors_dark.borderColor;
    bodyBg = config.colors_dark.bodyBg;
    headingColor = config.colors_dark.headingColor;
  } else {
    borderColor = config.colors.borderColor;
    bodyBg = config.colors.bodyBg;
    headingColor = config.colors.headingColor;
  }

  // Variable declaration for table
  var dt_user_table = $('.datatables-users-details'),
    select2 = $('.select2'),
    userView = '/Apps/Users/View/Account',
    statusObj = {
      1: { title: 'Pending', class: 'bg-label-warning' },
      2: { title: 'Active', class: 'bg-label-success' },
      3: { title: 'Inactive', class: 'bg-label-secondary' }
    };

  if (select2.length) {
    var $this = select2;
    select2Focus($this);
    $this.wrap('<div class="position-relative"></div>').select2({
      //placeholder: 'Select Billing',
      dropdownParent: $this.parent()
    });
  }

  // Users datatable
  if (dt_user_table.length) {
    var dt_user = dt_user_table.DataTable({
      //ajax: assetsPath + 'json/subscription_data.json', // JSON file to add data
      ajax: '/json/users_data.json', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'id' },
        { data: 'user_name_first' },
        { data: 'user_contact' },
        { data: 'user_email' },
        { data: 'user_pan' },
        { data: 'user_aadhar' },
        { data: 'user_account_no' },
        { data: 'user_bank' },
        { data: 'user_bank_ifsc' },
        { data: 'user_role' },
        { data: 'user_status' },
        { data: 'user_address' },
        { data: 'property_id' },
        { data: 'onboarding_date' },
        { data: 'onboarded_by' },
        { data: 'action' },
      ],
      columnDefs: [
        {
          // For Responsive
          className: 'control',
          searchable: false,
          orderable: false,
          responsivePriority: 2,
          targets: 0,
          render: function (data, type, full, meta) {
            return '';
          }
        },
        {
          // For Checkboxes
          targets: 1,
          orderable: false,
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">'
          },
          responsivePriority: 4
        },
        {
          //Subscription Status
          targets: 2,
          render: function (data, type, full, meta) {
            var $first_name = full['user_name_first'];
            var $last_name = full['user_name_last'];
            return '<span >' + $first_name + " " + $last_name  + ' </span>';
          }
        },
        {
          //Billing Cycle
          targets: 3,
          render: function (data, type, full, meta) {
            var $contact1 = full['user_contact1'];
            var $contact2 = full['user_contact2'];
            return '<span >' + $contact1 + '<br>' + $contact2 + ' </span>';
          }
        },
        {
          //Subscription Key
          targets: 4,
          render: function (data, type, full, meta) {
            var $email = full['user_email'];
            return '<span >' + $email + ' </span>';
          }
        },
        {
          //Pan
          targets: 5,
          render: function (data, type, full, meta) {
            var $pan = full['user_pan'];
            return "<span class='text-truncate d-flex align-items-center'>" + $pan + '</span>';
          }
        },
        {
          //Aadhar
          targets: 6,
          render: function (data, type, full, meta) {
            var $aadhar = full['user_aadhar'];
            //.slice(0, 3) + '******' + $aadhar.slice($aadhar.length - 8, $aadhar.length - 1) +
            return '<span >' + $aadhar + ' </span>';
          }
        },
        {
          /// Account no.
          targets: 7,
          render: function (data, type, full, meta) {
            var $user_account_no = full['user_account_no'];
            //.slice(0, 3) + "********" + $user_account_no.slice($user_account_no.length - 11, $user_account_no.length - 1) +
            return "<span class='text-truncate d-flex align-items-center'>" + $user_account_no + '</span>';
          }
        },
        {
          //Property Per day Charge
          targets: 8,
          render: function (data, type, full, meta) {
            var $user_bank = full['user_bank'];
            return "<span class='text-truncate d-flex align-items-center'>" + $user_bank + '</span>';
          }
        },
        {
          //Property Per day Charge
          targets: 9,
          render: function (data, type, full, meta) {


            var $user_bank_ifsc = full['user_bank_ifsc'];
            return "<span class='text-truncate d-flex align-items-center'>" + $user_bank_ifsc + "</span>";
          }
        },
        {
          //Property Per day Charge
          targets: 10,
          render: function (data, type, full, meta) {


            var $user_role = full['user_role'];
            return "<span class='text-truncate d-flex align-items-center'>" + $user_role + "</span>";
          }
        },
        {
          //Property Per day Charge
          targets: 11,
          render: function (data, type, full, meta) {


            var $user_status = full['user_status'];
            return "<span class='text-truncate d-flex align-items-center'>" + $user_status + "</span>";
          }
        },
        {
          //Property Per day Charge
          targets: 12,
          render: function (data, type, full, meta) {


            var $user_address = full['user_address'];
            return "<span class='text-truncate d-flex align-items-center'>" + $user_address + "</span>";
          }
        },
        {
          //Property Per day Charge
          targets: 13,
          render: function (data, type, full, meta) {


            var $property_id = full['property_id'];
            return "<span class='text-truncate d-flex align-items-center'>" + $property_id + "</span>";
          }
        },
        {
          //Property Per day Charge
          targets: 14,
          render: function (data, type, full, meta) {


            var $onboarding_date = full['onboarding_date'];
            return "<span class='text-truncate d-flex align-items-center'>" + $onboarding_date + "</span>";
          }
        },
        {
          //Property Per day Charge
          targets: 15,
          render: function (data, type, full, meta) {


            var $onboarded_by = full['onboarded_by'];
            return "<span class='text-truncate d-flex align-items-center'>" + $onboarded_by + "</span>";
          }
        },
        {
          //Actions
          targets: -1,
          title: 'Actions',
          searchable: false,
          orderable: false,
          render: function (data, type, full, meta) {
            return (
              '<div class="d-inline-block text-nowrap">' +
              '<button class="btn btn-sm btn-icon btn-text-secondary rounded-pill btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="mdi mdi-dots-vertical mdi-20px"></i></button>' +
              '<div class="dropdown-menu dropdown-menu-end m-0">' +
              '<a href="' +
              userView +
              '" class="dropdown-item"><i class="mdi mdi-eye-outline me-2"></i><span>View</span></a>' +
              '<a href="javascript:;" class="dropdown-item"><i class="mdi mdi-pencil-outline me-2"></i><span>Edit</span></a>' +
              '<a href="javascript:;" class="dropdown-item delete-record"><i class="mdi mdi-delete-outline me-2"></i><span>Delete</span></a>' +
              '</div>' +
              '</div>'
            );
          }
        }],
      dom:
        '<"row mx-1"' +
        '<"col-md-2 d-flex align-items-center justify-content-md-start justify-content-center"<"dt-action-buttons"B>>' +
        '<"col-md-10"<"d-flex align-items-center justify-content-md-end justify-content-center"<"me-3"f><"add-new">>>' +
        '>t' +
        '<"row mx-1"' +
        '<"col-sm-12 col-md-6"i>' +
        '<"col-sm-12 col-md-6"p>' +
        '>',
      language: {
        sLengthMenu: 'Show _MENU_',
        search: '',
        searchPlaceholder: 'Search..'
      },
      // Buttons with Dropdown
      buttons: [
        {
          extend: 'collection',
          className: 'btn btn-label-secondary dropdown-toggle waves-effect waves-light',
          text: '<i class="mdi mdi-export-variant me-1"></i> <span class="d-none d-sm-inline-block">Export</span>',
          buttons: [
            {
              extend: 'print',
              text: '<i class="mdi mdi-printer-outline me-1" ></i>Print',
              className: 'dropdown-item',
              exportOptions: {
                columns: [2, 3, 4, 5]
              },
              customize: function (win) {
                //customize print view for dark
                $(win.document.body)
                  .css('color', headingColor)
                  .css('border-color', borderColor)
                  .css('background-color', bodyBg);
                $(win.document.body)
                  .find('table')
                  .addClass('compact')
                  .css('color', 'inherit')
                  .css('border-color', 'inherit')
                  .css('background-color', 'inherit');
              }
            },
            {
              extend: 'csv',
              text: '<i class="mdi mdi-file-document-outline me-1" ></i>Csv',
              className: 'dropdown-item',
              exportOptions: {
                columns: [2, 3, 4, 5]
              }
            },
            {
              extend: 'excel',
              text: '<i class="mdi mdi-file-excel-outline me-1"></i>Excel',
              className: 'dropdown-item',
              exportOptions: {
                columns: [2, 3, 4, 5]
              }
            },
            {
              extend: 'pdf',
              text: '<i class="mdi mdi-file-pdf-box me-1"></i>Pdf',
              orientation: 'landscape',
              className: 'dropdown-item'//,
              //exportOptions: {
              //  columns: [2, 3, 4, 5]
              //}
            },
            {
              extend: 'copy',
              text: '<i class="mdi mdi-content-copy me-1"></i>Copy',
              className: 'dropdown-item',
              exportOptions: {
                columns: [2, 3, 4, 5]
              }
            }
          ]
        }
      ],
      // For responsive popup
      responsive: {
        details: {
          display: $.fn.dataTable.Responsive.display.modal({
            header: function (row) {
              var data = row.data();
              return 'Details of ' + data['user_name_first'] + " " + data['user_name_last'];
            }
          }),
          type: 'column',
          renderer: function (api, rowIdx, columns) {
            var data = $.map(columns, function (col, i) {
              return col.title !== '' // ? Do not show row in modal popup if title is blank (for check box)
                ? '<tr data-dt-row="' +
                col.rowIndex +
                '" data-dt-column="' +
                col.columnIndex +
                '">' +
                '<td>' +
                col.title +
                ':' +
                '</td> ' +
                '<td>' +
                col.data +
                '</td>' +
                '</tr>'
                : '';
            }).join('');

            return data ? $('<table class="table"/><tbody />').append(data) : false;
          }
        }
      },
      initComplete: function () {
       
        // Adding plan filter once table initialized
        this.api()
          .columns(9)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="FilterUserType" class="form-select text-capitalize"><option value="">User Status</option></select>'
            )
              .appendTo('.user_status')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>');
              });
          });
        // Adding role filter once table initialized
        this.api()
          .columns(8)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="FilterUserStatus1" class="form-select text-capitalize"><option value="">User Type</option></select>'
            )
              .appendTo('.user_type')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>');
              });
          });
        // Adding status filter once table initialized
        this.api()
          .columns(7)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="FilterProperty" class="form-select text-capitalize"><option value="">Property</option></select>'
            )
              .appendTo('.property_type')
              .on('change', function () {
                var val = $.fn.dataTable.util.escapeRegex($(this).val());
                column.search(val ? '^' + val + '$' : '', true, false).draw();
              });

            column
              .data()
              .unique()
              .sort()
              .each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>');
              });
          });
      }
    });
    $('.add-new').html(
      "<button class='btn btn-primary waves-effect waves-light' data-bs-toggle='offcanvas' data-bs-target='#offcanvasAddSubscription'><i class='mdi mdi-plus me-0 me-sm-1'></i><span class= 'd-none d-sm-inline-block'> Add New User </span ></button>"
    );
  }

  // Delete Record
  $('.datatables-users-details tbody').on('click', '.delete-record', function () {
    dt_user.row($(this).parents('tr')).remove().draw();
  });
  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);

  $("#Ankit").text(count);
  dt_user.on('search.dt', function () {
    var count = dt_user.rows({ search: 'applied' }).count();
    console.log(dt_user.page.info());
    $("#Ankit").text(count);
    console.log(count);
  });

});

// Validation & Phone mask
(function () {
  const phoneMaskList = document.querySelectorAll('.phone-mask'),
    addNewUserForm = document.getElementById('addNewUserForm');

  // Phone Number
  if (phoneMaskList) {
    phoneMaskList.forEach(function (phoneMask) {
      new Cleave(phoneMask, {
        phone: true,
        phoneRegionCode: 'US'
      });
    });
  }
  // Add New User Form Validation
  const fv = FormValidation.formValidation(addNewUserForm, {
    fields: {
      userFullname: {
        validators: {
          notEmpty: {
            message: 'Please enter fullname '
          }
        }
      },
      userEmail: {
        validators: {
          notEmpty: {
            message: 'Please enter your email'
          },
          emailAddress: {
            message: 'The value is not a valid email address'
          }
        }
      }
    },
    plugins: {
      trigger: new FormValidation.plugins.Trigger(),
      bootstrap5: new FormValidation.plugins.Bootstrap5({
        // Use this for enabling/changing valid/invalid class
        eleValidClass: '',
        rowSelector: function (field, ele) {
          // field is the field name & ele is the field element
          return '.mb-4';
        }
      }),
      submitButton: new FormValidation.plugins.SubmitButton(),
      // Submit the form when all fields are valid
      // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
      autoFocus: new FormValidation.plugins.AutoFocus()
    }
  });
})();

function a() {
  try {
    var data = {
      'Configuration': 'a',
      'Content': 'a'
    };
    Common.Fetch('POST', 'Subscription/GetSubscriptionData', data, prepData);

    //$.post("Subscription/GetSubscriptionData", data,
    //  function (data, status) {
    //    alert("Data: " + data + "\nStatus: " + status);
    //  });
  } catch (e) {
    console.log(e);
  }
}
function prepData(data, perpetualCallback) {
  if (data) {
    console.log(data);
    data.responseConfig = JSON.parse(decompressString(data.responseConfig));
    if (data.responseConfig.status == "200") {
      if (data.responseConfig.response_compression == "1")
        data = JSON.parse(decompressString(data.content));
      else
        data = JSON.parse(data.content);
      var my_columns = [];

      $.each(data[0], function (key, value) {
        var my_item = {};
        my_item.data = key;
        my_item.title = key;
        my_columns.push(my_item);
      });
      perpetualCallback(my_columns, data);
    }
    else {
      var respStatus;
      if (data.responseConfig.response_compression == "1")
        respStatus = decompressString(data.content)
      else
        respStatus = data.content;
      PNotify.error({
        title: data.responseConfig.status + " : " + data.responseConfig.description,
        text: respStatus,
        hide: true
      });
    }
  }
  else {
    PNotify.error({
      title: "No data received",
      text: "Please try again!!!",
      hide: true
    });
  }
}
function init_DataTables(my_columns, data) {
  if (typeof ($.fn.DataTable) === 'undefined') { return; }
  if ($("#datatable").length) {
    var footerCols = "<tr>";
    for (i = 0; i < my_columns.length; i++) {
      footerCols = footerCols + '<th></th>';
    }
    $("#datatable tfoot").append(footerCols + "</tr>");
    $("#datatable").DataTable({
      dom: "<'col-md-4 text-left'l><'col-md-4 text-center'B><'col-md-4 text-right'f>" +
        "<'col-sm-12 text-center'tr>" +
        "<'col-sm-5 text-left'i><'col-sm-7 text-right'p>",//'<lf<t>Bip>',    //"Blfrtip",
      columns: my_columns,
      data: data,
      buttons: [
        {
          extend: 'copyHtml5',
          text: '<i class="fa fa-files-o"></i>',
          titleAttr: 'Copy',
          className: 'btn btn-primary btn-xs'
        },
        {
          extend: 'excelHtml5',
          text: '<i class="fa fa-file-excel-o"></i>',
          titleAttr: 'Excel',
          autoFilter: true,
          sheetName: 'iAlert-GranularData',
          className: 'btn btn-primary btn-xs'
        },
        {
          extend: 'pdfHtml5',
          messageTop: 'Data exported from ATM iAlerts web portal. Please follow data confidentiality policy of the Bank',
          orientation: 'landscape',
          pageSize: 'A4',
          text: '<i class="fa fa-file-pdf-o"></i>',
          className: 'btn btn-primary btn-xs',
          titleAttr: 'PDF'
        },
        {
          extend: 'print',
          messageTop: 'Data exported from ATM iAlerts web portal. Please follow data confidentiality policy of the Bank',
          text: '<i class="fa fa-print"></i>',
          titleAttr: 'Copy',
          className: 'btn btn-primary btn-xs'
        },
      ],
      responsive: false,
      keys: true,
      scrollX: true,
      deferRender: true,
      fixedHeader: true,
      pageLength: 25,
      destroy: true
    });
  }
}
