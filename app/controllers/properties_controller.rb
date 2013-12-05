class PropertiesController < ApplicationController
  def index
    render json: { properties: Property.all }
  end

  def show
    # prop = Property.find(params[:id])
    # attrs = prop.attributes
    # attrs[:units] = prop.units.collect {|u| u.id }

    # render json: attrs.to_json #.to_json(:include => :units)
    render json: Property.find(params[:id])
  end

  def create
    property = Property.create(property_params)

    if property.new_record?
      render json: { errors: property.errors.messages }, status: 422
    else
      render json: property, status: 201
    end
  end

  # PATCH/PUT /units/1
  # PATCH/PUT /units/1.json
  def update
    @property = Property.find(params[:id])

    if @property.update(property_params)
      head :no_content
    else
      render json: @property.errors, status: :unprocessable_entity
    end
  end


  def destroy
    property = Property.find(params[:id])

    property.destroy

    render json: {}, status: 201
  end


  private

  # Strong Parameters (Rails 4)
  def property_params
    params.require(:property).permit(:neighborhood, :name, :street, :city, :state, :zip)
  end
end
