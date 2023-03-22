USING: 
    Firebase
    React 
    MongoDB
    React Router
    NodeJS
    GraphQL

    @mui/material @emotion/react @emotion/styled @fontsource/roboto @mui/icons-material

    react-draft-wysiwyg => create richtext editor
    draftjs-to-html => convert text from richtext editor to html


when working with GraphQL
    schema
        => giống như 1 document mô tả dữ liệu bao gồm những gì 
        3 type:
        Query: hoạt động cho những truy vấn từ phía client muốn truy vấn dữ liệu
        Mutation: sd cho những trường hợp muốn update hay xóa dữ liệu
        Subs: update dữ liệu theo dạng real-time
    resolver
        => xử lý data, trả về data cho client dựa theo những query từ phía client gửi tới

Firebase => authentication
page: 
    Login => ReactRouterDOM => phan trang
