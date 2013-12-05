class ImagesController < ApplicationController
  # GET /images
  # GET /images.json
  def index
    @images = Image.all

    render json: @images
  end

  # GET /images/1
  # GET /images/1.json
  def show
    @image = Image.find(params[:id])

    render json: @image
  end

  # POST /images
  # POST /images.json
  def create
    image = Image.create(image_params)

    if image.new_record?
      render json: { errors: image.errors.messages }, status: 422
    else
      render json: image, status: 201
    end
  end

  # PATCH/PUT /images/1
  # PATCH/PUT /images/1.json
  def update
    @image = Image.find(params[:id])

    #we can allow updating an image name and description and unit, but not the image data. for that we need to create a new image
    update_params = image_params
    update_params.delete("image")

    if @image.update(update_params)
      head :no_content
    else
      render json: @image.errors, status: :unprocessable_entity
    end
  end

  # DELETE /images/1
  # DELETE /images/1.json
  def destroy
    @image = Image.find(params[:id])
    @image.destroy

    head :no_content
  end

  # Strong Parameters (Rails 4)
  def image_params
    params.require(:image).permit(:name, :description, :unit_id, :image)
  end

end
