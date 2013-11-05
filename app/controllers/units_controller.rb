class UnitsController < ApplicationController
  def index
    if initiate_search?
      ar_query = _search

      render json: { units: ar_query }
    else
      render json: { units: Unit.all }
    end
  end

  def show
    render json: Unit.find(params[:id])
  end

  def create
    unit = Unit.create(unit_params)

    if unit.new_record?
      render json: { errors: unit.errors.messages }, status: 422
    else
      render json: unit, status: 201
    end
  end

  # PATCH/PUT /units/1
  # PATCH/PUT /units/1.json
  def update
    @unit = Unit.find(params[:id])

    if @unit.update(unit_params)
      head :no_content
    else
      render json: @unit.errors, status: :unprocessable_entity
    end
  end


  def destroy
    unit = Unit.find(params[:id])

    unit.destroy

    render json: {}, status: 201
  end


  private

  def _search
    ar_query = Unit

    ar_query = filter_by_searchable(ar_query)
    ar_query = filter_by_bedrooms(ar_query, query_bedrooms)
    ar_query = filter_by_bathrooms(ar_query, query_bathrooms)
    ar_query = filter_by_price(ar_query, query_price)
    ar_query = filter_by_neighborhood(ar_query, query_neighborhood)

    for_sale = params[:for_sale] || params["for_sale"]
    ar_query = filter_by_for_sale(ar_query, for_sale) unless for_sale.nil?

    for_rent = params[:for_rent] || params["for_rent"]
    ar_query = filter_by_for_rent(ar_query, for_rent) unless for_rent.nil?

    ar_query = Unit.all if ar_query.nil?
    ar_query
  end

  def query_bedrooms
    #return the query string, or nil if the params needed for this query weren't sent.
    "#{params[:min_bedrooms]}:#{params[:max_bedrooms]}" if params[:min_bedrooms] && params[:max_bedrooms]
  end

  def query_bathrooms
    #return the query string, or nil if the params needed for this query weren't sent.
    "#{params[:min_bathrooms]}:#{params[:max_bathrooms]}" if params[:min_bathrooms] && params[:max_bathrooms]
  end

  def query_price
    #return the query string, or nil if the params needed for this query weren't sent.
    "#{params[:min_price]}:#{params[:max_price]}" if params[:min_price] && params[:max_price]
  end

  def query_neighborhood
    params[:neighborhood]
  end

  def initiate_search?
    params.keys.each do |key|
      if search_params.include?(key.to_sym)
        return true
      end
    end

    return false
  end

  def search_params
    [:min_bedrooms, :max_bedrooms, :min_price, :max_price, :min_bathrooms, :max_bathrooms, :neighborhood, :for_sale, :for_rent]
  end

  def filter_by_searchable(ar_query)
    ar_query = ar_query.where("searchable = ?", true)
  end

  def filter_by_bedrooms(ar_query, bedrooms)
    unless bedrooms.nil?
      #active record query
      if bedrooms.include?(":")
        #bedrooms value is a range
        vals = bedrooms.split(":")
        ar_query = ar_query.where("bedrooms >= ?", vals[0].to_i).where("bedrooms <= ?", vals[1].to_i)
      else
        ar_query = ar_query.where("bedrooms = ?", bedrooms)
      end
    end

    ar_query
  end

  def filter_by_bathrooms(ar_query, bathrooms)
    unless bathrooms.nil?
      #active record query
      if bathrooms.include?(":")
        #bedrooms value is a range
        vals = bathrooms.split(":")
        ar_query = ar_query.where("bathrooms >= ?", vals[0].to_i).where("bathrooms <= ?", vals[1].to_i)
      else
        ar_query = ar_query.where("bathrooms = ?", bathrooms)
      end
    end

    ar_query
  end

  def filter_by_price(ar_query, price_str)
    unless price_str.nil?
      if price_str.include?(":")
        vals = price_str.split(":")
        ar_query = ar_query.where("price >= ? and price <= ?", vals[0].to_f, vals[1].to_f)
      else
        ar_query = ar_query.where("price = ?", price_str.to_f)
      end
    end

    ar_query
  end

  def filter_by_neighborhood(ar_query, neighborhood)  
    unless neighborhood.nil?
      ar_query = ar_query.where("neighborhood in (?)", neighborhood)
    end

    ar_query
  end

  def filter_by_for_sale(ar_query, bool)
    #convert bool to boolean if a string is passed in
    #borrowed from http://jeffgardner.org/2011/08/04/rails-string-to-boolean-method/
    bool = (bool =~ (/(true|t|yes|y|1)$/i) ? true : false) if bool.instance_of?(String)

    ar_query = ar_query.where("for_sale = ?", bool)
  end

  def filter_by_for_rent(ar_query, bool)
    #convert bool to boolean if a string is passed in
    bool = (bool =~ (/(true|t|yes|y|1)$/i) ? true : false) if bool.instance_of?(String)

    ar_query = ar_query.where("for_rent = ?", bool)
  end

  # Strong Parameters (Rails 4)
  def unit_params
    params.require(:unit).permit(:bedrooms, :bathrooms, :unit_number, :property_id, :neighborhood, :price,
            :unit_type, :sqft, :description, :lon, :lat, :searchable, :for_sale, :for_rent, :amenity_list,
            :contact_id)

  end
end
