require 'json'

# get '/wines' do
#   if request.xhr?
#     response = RestClient.get 'http://api.snooth.com/wines/?akey=z73ermysaslgu6c3wad92bvw7ywq3u0nphjm7a5s0gdg74k9&ip=208.184.96.233'
#     parsed_data = JSON.parse(response)
#     wines_arr = parsed_data["wines"]
#     wines = wines_arr[rand(wines_arr.length)]
#     erb :'_wine', layout: false, locals: {wine: wine}
#   else
#     redirect '/'
#   end
# end

post '/wines' do


  search_query2 = nil
  if params[:type] == 'red' || params[:type] == 'white'
    search_query2 = "&t=wine&color=" + params[:type]
  elsif params[:type] == 'sparkling'
    search_query2 = "&t=" + params[:type]
  end

  if params[:varietal]
    search_query1 = "&q=" + params[:varietal]
  else
    search_query1 = "&q=wine"
  end

  # Remove spaces from 2 word wine types
  search_query1 = search_query1.gsub(/\s/, '&20')
  search_query2 = search_query2.gsub(/\s/, '&20')


  response = RestClient.get 'http://api.snooth.com/wines/?akey=<API KEY>&ip=66.28.234.115&q=' + search_query1 + '&n=2' + search_query2

  parsed_data = JSON.parse(response)
  # puts parsed_data

  wines = parsed_data["wines"]
  # puts wines
  #
  wine_codes = []
  wines.each do |wine|
    wine_codes << wine["code"]
  end

  @recipes = []
  wine_codes.each do |code|
      response = RestClient.get 'http://api.snooth.com/wine/?akey=<API KEYg>&ip=66.28.234.115&food=1&id=' + code
      parsed_data = JSON.parse(response)
      hashed_data = parsed_data["wines"][0]["recipes"]
      hashed_data.each do |recipe_hash|
        @recipes << recipe_hash
      end
  end


  puts @recipes.uniq!
  puts @recipes.count

  return erb :'_recipe_card', layout: false


  # return recipes.to_json



end
