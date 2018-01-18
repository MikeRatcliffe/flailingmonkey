Jekyll::Hooks.register(:pages, :post_write) do |pages|
  filename = File.join(Dir.pwd, '_site', 'rss', 'index.html')

  File.open(filename, 'w') do |line|
    content = %Q(<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="refresh"
  content="0; url=./mozilla/">
</head>
<body>
</body>)

    line.puts(content)
  end
end
