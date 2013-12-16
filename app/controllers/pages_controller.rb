class PagesController < ApplicationController
  def index
    ar_query = Page
    is_query = false

    unless params[:slug].nil?
      is_query = true
      ar_query = ar_query.where("slug = ?", params[:slug])
    end

    if is_query
      render json: { pages: ar_query }
    else
      render json: { pages: Page.all }
    end
  end

  def show
    # prop = Property.find(params[:id])
    # attrs = prop.attributes
    # attrs[:units] = prop.units.collect {|u| u.id }

    # render json: attrs.to_json #.to_json(:include => :units)
    render json: Page.find(params[:id])
  end

  def create
    page = Page.create(page_params)

    if page.new_record?
      render json: { errors: page.errors.messages }, status: 422
    else
      render json: page, status: 201
    end
  end

  # PATCH/PUT /units/1
  # PATCH/PUT /units/1.json
  def update
    @page = Page.find(params[:id])

    if @page.update(page_params)
      head :no_content
    else
      render json: @page.errors, status: :unprocessable_entity
    end
  end


  def destroy
    page = Page.find(params[:id])

    page.destroy

    render json: {}, status: 201
  end

  private

  # Strong Parameters (Rails 4)
  def page_params
    params.require(:page).permit(:title, :content_area, :slug)
  end
end
