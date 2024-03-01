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
  var dt_user_table = $('.datatables-users'),
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
    console.log();
    var dt_user = dt_user_table.DataTable({
      //ajax: assetsPath + 'json/subscription_data.json', // JSON file to add data
      ajax: '/json/subscription_data.json', // JSON file to add data
      columns: [
        // columns according to JSON
        { data: '' },
        { data: 'id' },
        { data: 'sub_status' },
        { data: 'billing_start' },
        { data: 'sub_key' },
        { data: 'sub_type' },
        { data: 'property_perday_charge' },
        { data: 'discount_offered' },
        { data: 'discount_type' },
        { data: 'discount_amount' },
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
            var $sub_status = full['sub_status'];
            var sub_statusBadgeObj = {
              suspended: 'bg-label-warning',
              active: 'bg-label-success',
              expired: 'bg-label-danger',
              staged: 'bg-label-info'
            };
            return (
              '<span class="badge rounded-pill ' +
              sub_statusBadgeObj[$sub_status] +
              '" text-capitalized>' +
              $sub_status +
              '</span>'
            );
          }
        },
        {
          //Billing Cycle
          targets: 3,
          render: function (data, type, full, meta) {
            var $billing_start = full['billing_start'];
            var $billing_end = full['billing_end'];
            return '<span >' + $billing_start + ' - ' + $billing_end + ' </span>';
          }
        },
        {
          //Subscription Key
          targets: 4,
          render: function (data, type, full, meta) {
            var $sub_key = full['sub_key'];
            var len_sub_key = $sub_key.length;
            return '<span >' + $sub_key.slice(0, 7) + '******' + $sub_key.slice(len_sub_key - 8, len_sub_key - 1) + ' </span>';
          }
        },
        {
          //Subscription Type
          targets: 5,
          render: function (data, type, full, meta) {
            var $sub_type = full['sub_type'];
            var roomTypeStore = {
              OccupiedRooms: '<i class="mdi mdi-cog-outline mdi-20px text-primary me-2"></i>',
              NumOfRooms: '<i class="mdi mdi-chart-donut mdi-20px text-info me-2"></i>'
            };
            return "<span class='text-truncate d-flex align-items-center'>" + roomTypeStore[$sub_type] + $sub_type + '</span>';
          }
        },
        {
          //Property Per day Charge
          targets: 6,
          render: function (data, type, full, meta) {
            var $billing_curr = full['billing_curr'];
            var $property_perday_charge = full['property_perday_charge'];

            var numFormatted = $property_perday_charge.toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: $billing_curr
            });

            return '<span class="h6">' + numFormatted + '</span>';
          }
        },
        {
          //Property Per day Charge
          targets: 7,
          render: function (data, type, full, meta) {
            var $discount_offered = full['discount_offered'];

            var discount_offeredStore = {
              yes: '<i class="mdi mdi-check-outline mdi-20px text-success me-2"></i>',
              no: '<i class="mdi mdi-close-outline mdi-20px text-danger me-2"></i>'
            };

            return "<span class='text-truncate d-flex align-items-center'>" + discount_offeredStore[$discount_offered] + $discount_offered + '</span>';
          }
        },
        {
          //Property Per day Charge
          targets: 8,
          render: function (data, type, full, meta) {
            var $discount_offered = full['discount_offered'];
            var $discount_type = full['discount_type'];
            return $discount_offered == 'yes' ? "<span class='text-truncate d-flex align-items-center'>" + $discount_type + "</span>" : "";
          }
        },
        {
          //Property Per day Charge
          targets: 9,
          render: function (data, type, full, meta) {
            var $discount_offered = full['discount_offered'];
            var $discount_type = full['discount_type'];
            var $billing_curr = full['billing_curr'];
            var $discount_amount = full['discount_amount'];

            var numFormatted = $discount_amount.toLocaleString('en-IN', {
              maximumFractionDigits: 2,
              style: 'currency',
              currency: $billing_curr
            });
            return $discount_offered == 'yes' ? $discount_type == "percentage" ? '<span>' + $discount_amount + '%</span>' : '<span>' + numFormatted + '</span>' : "";
            //return $discount_type == "percentage" ? '<span>' + $discount_amount + '%</span>' : '<span>' + numFormatted + '</span>';
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
              return 'Details of ' + data['sub_status'];
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
        // Adding role filter once table initialized
        this.api()
          .columns(2)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="FilterSubscriptionStatus" class="form-select text-capitalize"><option value="">Subscription Status</option></select>'
            )
              .appendTo('.subscription_status')
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
        // Adding plan filter once table initialized
        this.api()
          .columns(7)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="FilterDiscountType" class="form-select text-capitalize"><option value="">Discount Type</option></select>'
            )
              .appendTo('.discount_type')
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
          .columns(5)
          .every(function () {
            var column = this;
            var select = $(
              '<select id="FilterSubType" class="form-select text-capitalize"><option value="">Subscription Type</option></select>'
            )
              .appendTo('.subscription_type')
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
      "<button class='btn btn-primary waves-effect waves-light' data-bs-toggle='offcanvas' data-bs-target='#offcanvasAddSubscription'><i class='mdi mdi-plus me-0 me-sm-1'></i><span class= 'd-none d-sm-inline-block'> Add New Subscription </span ></button>"
    );
  }

  // Delete Record
  $('.datatables-users tbody').on('click', '.delete-record', function () {
    dt_user.row($(this).parents('tr')).remove().draw();
  });
  // Filter form control to default size
  // ? setTimeout used for multilingual table initialization
  setTimeout(() => {
    $('.dataTables_filter .form-control').removeClass('form-control-sm');
    $('.dataTables_length .form-select').removeClass('form-select-sm');
  }, 300);

  dt_user.on('search.dt', function () {
    var count = dt_user.rows({ search: 'applied' }).count().toLocaleString();
    console.log(dt_user.page.info());
    $("#TotalSubscriptions").text(count);
    console.log(count);
  });

});

// Validation & Phone mask
//(function () {
//  const phoneMaskList = document.querySelectorAll('.phone-mask'),
//    addNewUserForm = document.getElementById('addNewUserForm');

//  // Phone Number
//  if (phoneMaskList) {
//    phoneMaskList.forEach(function (phoneMask) {
//      new Cleave(phoneMask, {
//        phone: true,
//        phoneRegionCode: 'US'
//      });
//    });
//  }
//  // Add New User Form Validation
//  const fv = FormValidation.formValidation(addNewUserForm, {
//    fields: {
//      userFullname: {
//        validators: {
//          notEmpty: {
//            message: 'Please enter fullname '
//          }
//        }
//      },
//      userEmail: {
//        validators: {
//          notEmpty: {
//            message: 'Please enter your email'
//          },
//          emailAddress: {
//            message: 'The value is not a valid email address'
//          }
//        }
//      }
//    },
//    plugins: {
//      trigger: new FormValidation.plugins.Trigger(),
//      bootstrap5: new FormValidation.plugins.Bootstrap5({
//        // Use this for enabling/changing valid/invalid class
//        eleValidClass: '',
//        rowSelector: function (field, ele) {
//          // field is the field name & ele is the field element
//          return '.mb-4';   
//        }
//      }),
//      submitButton: new FormValidation.plugins.SubmitButton(),
//      // Submit the form when all fields are valid
//      // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
//      autoFocus: new FormValidation.plugins.AutoFocus()
//    }
//  });
//})();

function a() {
  try {
    var data = JSON.stringify({
      'Configuration': getRequestConfig(0, 1, 1, 0),
      'Content': JSON.stringify({
        'MIGRATION_DATE': 'Ankit'
      })
    });
    Common.Fetch('POST', 'GetSubscriptionData', data, prepData);

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
